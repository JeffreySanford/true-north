@echo off
REM DRACONIAN ENFORCEMENT SETUP - Windows Batch Fallback
REM Ensures TypeScript execution environment is available

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║              DRACONIAN ENFORCEMENT SETUP                     ║
echo ║                                                               ║
echo ║        🛡️  CONFIGURING ZERO-TOLERANCE ENVIRONMENT 🛡️        ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo 🔧 Installing TypeScript execution dependencies...
npm install

echo 🔧 Running TypeScript setup script...
npx tsx tools/setup-draconian-enforcement.ts

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ TypeScript execution failed, trying Node.js fallback...
    echo 🔧 Compiling TypeScript to JavaScript...
    npx tsc tools/setup-draconian-enforcement.ts --outDir temp --target es2020 --module commonjs --moduleResolution node --esModuleInterop true --skipLibCheck true
    
    if %ERRORLEVEL% EQU 0 (
        echo 🔧 Running compiled JavaScript...
        node temp/tools/setup-draconian-enforcement.js
        echo 🧹 Cleaning up temporary files...
        rmdir /s /q temp
    ) else (
        echo ❌ Setup failed. Please install tsx manually:
        echo    npm install -g tsx
        echo    Then run: npm run enforce:setup
        exit /b 1
    )
)

echo.
echo 🏆 DRACONIAN ENFORCEMENT SETUP COMPLETE
echo.