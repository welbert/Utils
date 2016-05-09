reg export "HKEY_LOCAL_MACHINE" "C:\Users\%username%\Desktop\backupbeforeChocolatey.reg

REM Instação do chocolatey
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

REM "Navegadores"
choco install googlechrome -y
choco install firefox -y -packageParameters "l=pt-BR"
choco install firefox-dev -pre -y

REM "Essentials"
choco install flashplayerplugin -y
choco install winrar -y
choco install adobereader -y
choco install jdk8 -y -params "x64=true"
choco install k-litecodecpackfull -y
choco install ccleaner -y
choco install teamspeak -y
choco install teamviewer -y

REM "Jogos"
choco install steam -y

REM "Utilitários"
choco install msiafterburner -y
choco install processhacker.install -y

REM "Criptografia"
choco install gpg4win -y
choco install veracrypt -y

REM "Virtualização"
choco install virtualbox -y

REM "Programação"
choco install git.install -y -params "/GitAndUnixToolsOnPath /NoAutoCrlf"
choco install atom -y
choco upgrade atom -y
choco install sublimetext3 -y
choco install winmerge -y

REM "Atualização"
choco upgrade all -y

REM "ConfiguraçãoGit"
git config --global user.email "welberts@gmail.com"
git config --global user.name "Welbert Serra"
REM "ConfiguraçãoAutoRunUsbDisable"
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /t REG_DWORD /d 4 /f


reg export "HKEY_LOCAL_MACHINE" "C:\Users\%username%\Desktop\backupAfterChocolatey.reg

