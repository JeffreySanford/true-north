# True North Insights - NestJS Backend Coding Standards

## 🏛️ **BACKEND ARCHITECTURAL PHILOSOPHY**

> **"Observable-driven backend architecture maintains consistency with traditional Angular frontend patterns"**

This document establishes **IMMUTABLE** coding standards for NestJS backend architecture that perfectly complements our traditional Angular modular frontend. These standards ensure end-to-end architectural consistency, type safety, and performance optimization.

## 📜 **CORE BACKEND PRINCIPLES**

### 1. **OBSERVABLE-DRIVEN API RESPONSES**

- **All controller methods return observables** - Never promises or direct values
- **Service methods use RxJS patterns** - Hot observables with shareReplay(1)
- **Database operations as observables** - Consistent reactive patterns
- **Error handling through catchError** - No try/catch blocks

### 2. **MODULAR NESTJS ARCHITECTURE**

- **Feature modules for organization** - Clear separation of concerns
- **Provider injection patterns** - Interface-based dependencies
- **Guard and interceptor modules** - Reusable cross-cutting concerns
- **Repository pattern enforcement** - Abstract data access

### 3. **TYPE-SAFE END-TO-END**

- **Shared DTOs between frontend/backend** - Single source of truth
- **Interface-based services** - Dependency inversion
- **Explicit return types** - No implicit any types
- **Validation pipes everywhere** - Runtime type checking

---

## 🚫 **FORBIDDEN BACKEND PATTERNS**

### **NEVER ALLOWED - ZERO TOLERANCE:**

```typescript
// ❌ FORBIDDEN: Async/await in controllers (breaks observable chain)
@Controller()
export class BadController {
  @Get()
  async getData(): Promise<Data[]> { // ⚠️ PROMISE VIOLATION
    return await this.service.getData();
  }
}

// ❌ FORBIDDEN: Direct database access in controllers
@Controller()
export class BadController {
  constructor(private readonly repository: Repository<Entity>) {} // ⚠️ DI VIOLATION
  
  @Get()
  getData() {
    return this.repository.find(); // ⚠️ DIRECT DB ACCESS
  }
}

// ❌ FORBIDDEN: Untyped responses
@Controller()
export class BadController {
  @Get()
  getData(): any { // ⚠️ TYPING VIOLATION
    return { data: 'anything' };
  }
}
```

---

## ✅ **MANDATORY BACKEND PATTERNS**

### **1. OBSERVABLE-DRIVEN CONTROLLERS**

```typescript
// ✅ REQUIRED: Observable-returning controllers
@Controller('api/data')
export class DataController {
  constructor(
    @Inject('IDataService') private readonly dataService: IDataService,
    @Inject('ILoggingService') private readonly logger: ILoggingService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  public getData(
    @Query(ValidationPipe) query: GetDataQueryDto
  ): Observable<DataResponseDto[]> {
    return this.dataService.findAll(query).pipe(
      map((entities: DataEntity[]) => entities.map(entity => 
        this.mapEntityToDto(entity)
      )),
      tap((data: DataResponseDto[]) => 
        this.logger.info('Data retrieved', { count: data.length })
      ),
      catchError((error: Error) => {
        this.logger.error('Data retrieval failed', error);
        return throwError(() => new HttpException(
          'Failed to retrieve data',
          HttpStatus.INTERNAL_SERVER_ERROR
        ));
      })
    );
  }

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public createData(
    @Body() createDto: CreateDataDto
  ): Observable<DataResponseDto> {
    return this.dataService.create(createDto).pipe(
      map((entity: DataEntity) => this.mapEntityToDto(entity)),
      tap((data: DataResponseDto) => 
        this.logger.info('Data created', { id: data.id })
      ),
      catchError((error: Error) => {
        this.logger.error('Data creation failed', error);
        if (error instanceof ConflictException) {
          return throwError(() => error);
        }
        return throwError(() => new HttpException(
          'Failed to create data',
          HttpStatus.INTERNAL_SERVER_ERROR
        ));
      })
    );
  }

  private mapEntityToDto(entity: DataEntity): DataResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}
```

### **2. OBSERVABLE-DRIVEN SERVICES**

```typescript
// ✅ REQUIRED: Service with hot observables
@Injectable()
export class DataService implements IDataService, OnModuleDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly cacheSubject$ = new BehaviorSubject<Map<string, DataEntity>>(new Map());

  // Hot observable cache
  public readonly cache$ = this.cacheSubject$.pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  constructor(
    @Inject('IDataRepository') private readonly repository: IDataRepository,
    @Inject('ILoggingService') private readonly logger: ILoggingService,
    @Inject('ICacheService') private readonly cacheService: ICacheService
  ) {}

  public findAll(query: GetDataQueryDto): Observable<DataEntity[]> {
    const cacheKey = this.generateCacheKey(query);
    
    return this.cacheService.get<DataEntity[]>(cacheKey).pipe(
      switchMap((cached: DataEntity[] | null) => {
        if (cached) {
          this.logger.debug('Data retrieved from cache', { key: cacheKey });
          return of(cached);
        }
        
        return this.repository.findAll(query).pipe(
          tap((entities: DataEntity[]) => {
            this.cacheService.set(cacheKey, entities, 300); // 5min cache
            this.updateCache(entities);
          })
        );
      }),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  public create(createDto: CreateDataDto): Observable<DataEntity> {
    return this.repository.create(createDto).pipe(
      tap((entity: DataEntity) => {
        this.invalidateCache();
        this.logger.info('Data entity created', { id: entity.id });
      }),
      catchError((error: Error) => {
        this.logger.error('Data creation failed', error);
        return throwError(() => error);
      }),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  public onModuleDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateCacheKey(query: GetDataQueryDto): string {
    return `data:query:${JSON.stringify(query)}`;
  }

  private updateCache(entities: DataEntity[]): void {
    const currentCache = this.cacheSubject$.value;
    const newCache = new Map(currentCache);
    
    entities.forEach(entity => {
      newCache.set(entity.id, entity);
    });
    
    this.cacheSubject$.next(newCache);
  }

  private invalidateCache(): void {
    this.cacheSubject$.next(new Map());
  }
}
```

### **3. REPOSITORY PATTERN (OBSERVABLE-BASED)**

```typescript
// ✅ REQUIRED: Observable repository interface
export interface IDataRepository {
  findAll(query: GetDataQueryDto): Observable<DataEntity[]>;
  findById(id: string): Observable<DataEntity | null>;
  create(createDto: CreateDataDto): Observable<DataEntity>;
  update(id: string, updateDto: UpdateDataDto): Observable<DataEntity>;
  delete(id: string): Observable<void>;
}

// ✅ REQUIRED: Repository implementation
@Injectable()
export class DataRepository implements IDataRepository {
  constructor(
    @InjectRepository(DataEntity)
    private readonly repository: Repository<DataEntity>,
    @Inject('ILoggingService') 
    private readonly logger: ILoggingService
  ) {}

  public findAll(query: GetDataQueryDto): Observable<DataEntity[]> {
    return from(
      this.repository.find({
        where: this.buildWhereClause(query),
        order: { createdAt: 'DESC' },
        take: query.limit || 50,
        skip: query.offset || 0
      })
    ).pipe(
      catchError((error: Error) => {
        this.logger.error('Database query failed', error);
        return throwError(() => new InternalServerErrorException(
          'Database query failed'
        ));
      })
    );
  }

  public findById(id: string): Observable<DataEntity | null> {
    return from(this.repository.findOne({ where: { id } })).pipe(
      map((entity: DataEntity | null) => entity),
      catchError((error: Error) => {
        this.logger.error('Database findById failed', { id, error });
        return throwError(() => new InternalServerErrorException(
          'Database query failed'
        ));
      })
    );
  }

  public create(createDto: CreateDataDto): Observable<DataEntity> {
    const entity = this.repository.create(createDto);
    
    return from(this.repository.save(entity)).pipe(
      catchError((error: Error) => {
        this.logger.error('Database create failed', error);
        if (error.message.includes('duplicate')) {
          return throwError(() => new ConflictException(
            'Data already exists'
          ));
        }
        return throwError(() => new InternalServerErrorException(
          'Database create failed'
        ));
      })
    );
  }

  private buildWhereClause(query: GetDataQueryDto): FindOptionsWhere<DataEntity> {
    const where: FindOptionsWhere<DataEntity> = {};
    
    if (query.name) {
      where.name = Like(`%${query.name}%`);
    }
    
    if (query.status) {
      where.status = query.status;
    }
    
    return where;
  }
}
```

---

## 📊 **PERFORMANCE & MONITORING**

### **CACHING STRATEGY**

```typescript
// ✅ REQUIRED: Multi-level caching
@Injectable()
export class CacheService implements ICacheService {
  private readonly memoryCache = new Map<string, CacheItem>();
  private readonly cleanupInterval: NodeJS.Timeout;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject('ILoggingService') private readonly logger: ILoggingService
  ) {
    // Cleanup expired memory cache every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanupMemoryCache();
    }, 300000);
  }

  public get<T>(key: string): Observable<T | null> {
    // Try memory cache first
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && !this.isExpired(memoryItem)) {
      return of(memoryItem.value as T);
    }

    // Try Redis cache
    return from(this.redis.get(key)).pipe(
      map((value: string | null) => {
        if (value) {
          const parsed = JSON.parse(value) as T;
          // Update memory cache
          this.memoryCache.set(key, {
            value: parsed,
            expiry: Date.now() + 60000 // 1 minute memory cache
          });
          return parsed;
        }
        return null;
      }),
      catchError((error: Error) => {
        this.logger.error('Cache get failed', { key, error });
        return of(null);
      })
    );
  }

  public set<T>(key: string, value: T, ttlSeconds: number): Observable<void> {
    const serialized = JSON.stringify(value);
    
    return from(this.redis.setex(key, ttlSeconds, serialized)).pipe(
      tap(() => {
        // Also set in memory cache
        this.memoryCache.set(key, {
          value,
          expiry: Date.now() + Math.min(ttlSeconds * 1000, 60000)
        });
      }),
      map(() => void 0),
      catchError((error: Error) => {
        this.logger.error('Cache set failed', { key, error });
        return of(void 0);
      })
    );
  }
}
```

---

## 📏 **QUALITY METRICS**

### **MANDATORY COMPLIANCE**

- **Test Coverage: 90%+ lines, 85%+ branches**
- **Response Time: < 200ms average**
- **Memory Usage: < 512MB per instance**
- **CPU Usage: < 70% under load**
- **Database Query Optimization: All queries indexed**

---

## 🛡️ **BACKEND ARCHITECTURAL INTEGRITY**

These backend standards work in perfect harmony with the frontend traditional modular architecture:

1. **End-to-End Type Safety** - Shared DTOs ensure consistency
2. **Observable Consistency** - Same reactive patterns throughout
3. **Module Boundaries** - Clear separation of concerns
4. **Performance Optimization** - Caching and monitoring
5. **Security First** - Validation, authentication, authorization

---

*Last Updated: October 1, 2025*  
*Version: 1.0.0*  
*Status: ENFORCED*