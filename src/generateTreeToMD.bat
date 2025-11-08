@echo off
REM =====================================================
REM  Script: generateTreePretty.bat
REM  Description: Creates a clean Markdown-style directory tree
REM  Output: tree.md
REM =====================================================

echo Generating directory tree...
echo ```plaintext > tree.md
tree /f >> tree.md
echo ``` >> tree.md
echo.
echo ✅ Directory tree saved as tree.md
pause
