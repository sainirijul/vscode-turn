@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  turn-language-server startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and TURN_LANGUAGE_SERVER_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\org.xtext.tColab.turn.diagram-0.5.0-SNAPSHOT.jar;%APP_HOME%\lib\org.xtext.tColab.turn.ide-0.5.0-SNAPSHOT.jar;%APP_HOME%\lib\org.xtext.tColab.turn-0.5.0-SNAPSHOT.jar;%APP_HOME%\lib\org.eclipse.sprotty.xtext-0.7.0.jar;%APP_HOME%\lib\org.eclipse.xtext.ide-2.20.0.jar;%APP_HOME%\lib\org.eclipse.lsp4j-0.8.1.jar;%APP_HOME%\lib\org.eclipse.elk.alg.layered-0.6.0.jar;%APP_HOME%\lib\org.eclipse.sprotty.server-0.7.0.jar;%APP_HOME%\lib\org.eclipse.sprotty.layout-0.7.0.jar;%APP_HOME%\lib\org.eclipse.xtext-2.20.0.jar;%APP_HOME%\lib\org.eclipse.lsp4j.generator-0.8.1.jar;%APP_HOME%\lib\org.eclipse.lsp4j.jsonrpc-0.8.1.jar;%APP_HOME%\lib\gson-2.8.6.jar;%APP_HOME%\lib\xercesImpl-2.12.0.jar;%APP_HOME%\lib\org.eclipse.elk.alg.common-0.6.0.jar;%APP_HOME%\lib\org.eclipse.elk.core-0.6.0.jar;%APP_HOME%\lib\org.eclipse.sprotty-0.7.0.jar;%APP_HOME%\lib\javax.websocket-api-1.0.jar;%APP_HOME%\lib\org.eclipse.xtext.util-2.20.0.jar;%APP_HOME%\lib\org.eclipse.xtend.lib-2.20.0.jar;%APP_HOME%\lib\log4j-1.2.17.jar;%APP_HOME%\lib\org.eclipse.equinox.common-3.10.500.jar;%APP_HOME%\lib\org.eclipse.osgi-3.15.0.jar;%APP_HOME%\lib\org.eclipse.elk.graph-0.6.0.jar;%APP_HOME%\lib\org.eclipse.emf.common-2.12.0.jar;%APP_HOME%\lib\org.eclipse.emf.ecore.xmi-2.12.0.jar;%APP_HOME%\lib\guice-3.0.jar;%APP_HOME%\lib\antlr-runtime-3.2.jar;%APP_HOME%\lib\xml-apis-1.4.01.jar;%APP_HOME%\lib\org.eclipse.emf.ecore.change-2.11.0.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\org.eclipse.emf.ecore-2.12.0.jar;%APP_HOME%\lib\org.eclipse.xtend.lib.macro-2.20.0.jar;%APP_HOME%\lib\org.eclipse.xtext.xbase.lib-2.20.0.jar;%APP_HOME%\lib\aopalliance-1.0.jar;%APP_HOME%\lib\guava-27.1-jre.jar;%APP_HOME%\lib\failureaccess-1.0.1.jar;%APP_HOME%\lib\listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar;%APP_HOME%\lib\jsr305-3.0.2.jar;%APP_HOME%\lib\checker-qual-2.5.2.jar;%APP_HOME%\lib\error_prone_annotations-2.2.0.jar;%APP_HOME%\lib\j2objc-annotations-1.1.jar;%APP_HOME%\lib\animal-sniffer-annotations-1.17.jar


@rem Execute turn-language-server
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %TURN_LANGUAGE_SERVER_OPTS%  -classpath "%CLASSPATH%" org.xtext.tColab.turn.diagram.launch.TurnServerLauncher %*

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable TURN_LANGUAGE_SERVER_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%TURN_LANGUAGE_SERVER_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
