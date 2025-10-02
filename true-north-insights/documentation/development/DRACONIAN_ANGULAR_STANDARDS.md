# Draconian Angular Coding Standards

## Traditional Architecture Enforcement Framework

*Created: October 2, 2025 9:30 AM EST*  
*Planned Duration: 2 hours*  
*Status: In Progress*  
*Priority: Critical*  
*Assigned To: Development Team*  

> "Zero Tolerance for Modern Anti-Patterns. Traditional Excellence Only."

---

## 🛡️ **ENFORCEMENT PHILOSOPHY**

True North Insights maintains **DRACONIAN** coding standards that eliminate
modern Angular anti-patterns and enforce traditional, battle-tested
architectural patterns. These standards are non-negotiable and enforced
through automated tooling with **ZERO TOLERANCE** for violations.

### **Core Principles:**

1. **Traditional NgModule Architecture** - NO standalone components
2. **Observable-Driven Everything** - NO async/await or Promises in services
3. **Constructor Dependency Injection** - NO inject() function usage
4. **Strict Type Safety** - NO 'any' types permitted
5. **Performance First** - OnPush change detection mandatory
6. **Memory Management** - destroy$ pattern required
7. **Explicit Imports** - NO barrel exports or wildcard imports

---

## 🚫 **PROHIBITED PATTERNS**

### **❌ CRITICAL VIOLATIONS (Build Fails)**

#### **1. Standalone Components**

```typescript
// ❌ FORBIDDEN - Will fail CI/CD
@Component({
  selector: 'app-example',
  standalone: true,  // DRACONIAN VIOLATION
  template: '...'
})
export class ExampleComponent {}
```

```typescript
// ✅ REQUIRED - Traditional NgModule
@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule],
  exports: [ExampleComponent]
})
export class ExampleModule {}

@Component({
  selector: 'app-example',
  template: '...',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  // Traditional implementation...
}
```

#### **2. Async/Await in Services**

```typescript
// ❌ FORBIDDEN - Will fail CI/CD
@Injectable()
export class DataService {
  async getData(): Promise<Data[]> {  // DRACONIAN VIOLATION
    const response = await this.http.get('/api/data').toPromise();
    return response;
  }
}
```

```typescript
// ✅ REQUIRED - Observable patterns
@Injectable()
export class DataService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data').pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

#### **3. inject() Function Usage**

```typescript
// ❌ FORBIDDEN - Will fail CI/CD
@Component({...})
export class ExampleComponent {
  private readonly dataService = inject(DataService);  // DRACONIAN VIOLATION
}
```

```typescript
// ✅ REQUIRED - Constructor injection
@Component({...})
export class ExampleComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router
  ) {}
}
```

#### **4. Any Type Usage**

```typescript
// ❌ FORBIDDEN - Will fail CI/CD
public processData(data: any): any {  // DRACONIAN VIOLATION
  return data.whatever;
}
```

```typescript
// ✅ REQUIRED - Explicit types
public interface DataModel {
  id: string;
  name: string;
  value: number;
}

public processData(data: DataModel): ProcessedData {
  return {
    processedId: data.id,
    processedName: data.name.toUpperCase(),
    processedValue: data.value * 2
  };
}
```

---

## ⚠️ **WARNING PATTERNS (Must Fix)**

### **1. Missing shareReplay(1)**

```typescript
// ⚠️ WARNING - Should be fixed
public getData(): Observable<Data[]> {
  return this.http.get<Data[]>('/api/data');  // Missing shareReplay
}
```

```typescript
// ✅ PREFERRED - Hot observable pattern
public getData(): Observable<Data[]> {
  return this.http.get<Data[]>('/api/data').pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );
}
```

### **2. Missing OnPush Change Detection**

```typescript
// ⚠️ WARNING - Performance issue
@Component({
  selector: 'app-example',
  template: '...'
  // Missing changeDetection
})
```

```typescript
// ✅ REQUIRED - Performance optimized
@Component({
  selector: 'app-example',
  template: '...',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

---

## 🛠️ **ENFORCEMENT MECHANISMS**

### **1. ESLint Configuration**

```javascript
// eslint.config.mjs
import draconianAngular from './tools/eslint-rules/index.js';

export default [
  {
    plugins: {
      'draconian-angular': draconianAngular
    },
    rules: {
      // CRITICAL - Build fails on violations
      'draconian-angular/enforce-ngmodule-architecture': 'error',
      'draconian-angular/enforce-observable-patterns': 'error',
      'draconian-angular/enforce-constructor-injection': 'error',
      'draconian-angular/enforce-type-safety': 'error',
      
      // WARNING - Must be addressed
      'draconian-angular/enforce-rxjs-patterns': 'warn',
      'draconian-angular/enforce-onpush-change-detection': 'warn',
      'draconian-angular/enforce-destroy-pattern': 'warn'
    }
  }
];
```

### **2. CI/CD Pipeline Integration**

```bash
# Pre-commit validation
npm run lint:strict  # Uses draconian-angular/strict configuration
npm run test         # All tests must pass
npm run build        # Build must succeed with zero warnings

# Automated rejection criteria
if [ $? -ne 0 ]; then
  echo "❌ DRACONIAN VIOLATION DETECTED - Commit rejected"
  exit 1
fi
```

### **3. TypeScript Compiler Configuration**

```json
// tsconfig.json - Strict enforcement
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitThis": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## 📋 **COMPLIANCE CHECKLIST**

### **Before Every Commit:**

- [ ] **NgModule Architecture**: All components declared in modules
- [ ] **Observable Patterns**: No async/await in services  
- [ ] **Constructor DI**: No inject() function usage
- [ ] **Type Safety**: No 'any' types used
- [ ] **Change Detection**: OnPush strategy specified
- [ ] **Memory Management**: destroy$ pattern implemented
- [ ] **RxJS Patterns**: shareReplay(1) and takeUntil used
- [ ] **Import Standards**: Explicit imports, no barrels

### **Automated Validation:**

```bash
# Run complete validation suite
npm run validate:draconian

# Individual validation steps
npm run lint:strict         # ESLint with draconian rules
npm run type-check:strict    # TypeScript strict validation
npm run test:coverage       # 100% test coverage required
npm run build:prod         # Production build validation
```

---

## 🎯 **PERFORMANCE REQUIREMENTS**

### **Mandatory Performance Standards:**

- **Bundle Size**: < 2MB for initial load
- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 3 seconds  
- **Memory Usage**: < 100MB sustained
- **Change Detection Cycles**: < 5ms per cycle

### **Observable Performance Patterns:**

```typescript
// ✅ REQUIRED - Hot observable with caching
@Injectable()
export class PerformantService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly cache$ = new Map<string, Observable<any>>();

  public getData(key: string): Observable<Data> {
    if (!this.cache$.has(key)) {
      const data$ = this.http.get<Data>(\`/api/data/\${key}\`).pipe(
        shareReplay(1),
        takeUntil(this.destroy$)
      );
      this.cache$.set(key, data$);
    }
    return this.cache$.get(key)!;
  }
}
```

---

## 🔒 **FEDERAL COMPLIANCE**

### **Required for Government Contracts:**

- **Audit Trail**: Every code change tracked and justified
- **Security Standards**: No dynamic code evaluation
- **Performance Monitoring**: Real-time metrics collection
- **Documentation**: Complete API documentation
- **Testing**: 100% unit and e2e test coverage

### **Compliance Validation:**

```typescript
// All services must implement audit logging
@Injectable()
export class ComplianceService implements OnDestroy {
  constructor(
    private readonly auditService: AuditService,
    private readonly loggingService: LoggingService
  ) {}

  public performOperation(operation: string): Observable<Result> {
    return this.auditService.logStart(operation).pipe(
      switchMap(() => this.executeOperation()),
      tap(result => this.auditService.logSuccess(operation, result)),
      catchError(error => {
        this.auditService.logError(operation, error);
        return throwError(() => error);
      }),
      takeUntil(this.destroy$)
    );
  }
}
```

---

## 🚀 **IMPLEMENTATION TIMELINE**

| **Phase** | **Duration** | **Deliverable** |
|-----------|--------------|-----------------|
| **Setup** | 2 hours | ESLint rules + documentation |
| **Integration** | 1 hour | CI/CD pipeline configuration |
| **Validation** | 1 hour | Existing code compliance check |
| **Training** | 30 minutes | Team standards review |

**Total Implementation:** 4.5 hours  
**Enforcement:** Immediate and automated  
**Compliance Rate:** 100% required for all commits

---

> "Legendary standards demand legendary enforcement. Zero compromise."
