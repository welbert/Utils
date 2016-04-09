#!/bin/bash
#Repositorios
echo "Repositorio do Ubuntu Tweak"
sudo add-apt-repository ppa:tualatrix/ppa -y
echo "Repositorio do Cardapio"
sudo add-apt-repository ppa:nilarimogard/webupd8 -y
echo "Repositorio do Gimp"
sudo add-apt-repository ppa:otto-kesselgulasch/gimp -y
sudo apt-get update

#Layout
sudo apt-get install gnome-session-flashback -y
sudo apt-get install indicator-applet-appmenu -y
sudo apt-get install indicator-applet-session -y
sudo apt-get install cardapio cardapio-gnomepanel -y 
sudo apt-get install ubuntu-tweak -y

#Internet
sudo apt-get install qbittorrent -y
sudo apt-get install chromium-browser -y

#Editor de Texto
sudo apt-get install vim -y
wget https://download.sublimetext.com/sublime-text_build-3103_amd64.deb
sudo dpkg -i sublime-text_build-3103_amd64.deb
rm sublime-text_build-3103_amd64

#Ferramenta de Merge
sudo apt-get install meld -y

#outros
sudo apt-get install dconf-tools -y
sudo apt-get install gimp -y
sudo apt-get install rar -y
sudo apt-get install nautilus-open-terminal -y
sudo apt-get install vlc -y

#Programação
sudo apt-get install git -y
sudo apt-get install g++ -y
sudo apt-get install default-jdk -y
sudo apt-get install npm -y
ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g grunt-cli 

#Atualização 
sudo apt-get upgrade -y
sudo apt-get autoremove -y
sudo apt-get autoclean -y

#Configurações
nautilus -q
git config --global user.email "welberts@gmail.com"
git config --global user.name "Welbert Serra"
git config --global merge.tool meld
git config --global diff.tool meld
gsettings set org.gnome.desktop.wm.preferences button-layout 'menu:minimize,maximize,close'
gsettings set com.canonical.desktop.interface scrollbar-mode normal
amixer sset Master 0


echo "obs1: para o exec do .desktop colocar 'sh -c executavel'"