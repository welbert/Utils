#!/bin/bash
git submodule init
git submodule update
git submodule foreach git checkout .
git submodule foreach git pull origin master