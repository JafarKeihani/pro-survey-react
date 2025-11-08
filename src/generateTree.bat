@echo off
REM ==========================================
REM  Script: generateTree.bat
REM  Description: Generates a full directory tree (with subfolders and files)
REM  Output: tree.txt (in the same folder)
REM ==========================================

echo Generating directory tree...
dir /s /b > tree.txt
echo.
echo ✅ Directory tree saved as tree.txt
pause
