#
# Employee Attendance Management System
#

PROJECT = "Employee Attendance Management System"

all: install test start

test: ;@echo "Testing ${PROJECT}....."; 
	node_modules/.bin/jest --testEnvironment=node --runInBand --detectOpenHandles --forceExit ./tests"

start : ;@echo "Starting ${PROJECT} In production mode....."; 
	node server

dev : ;@echo "Starting ${PROJECT} In developeent mode....."; 
	nodemon server

install: ;@echo "Installing ${PROJECT}....."; 
	npm install

update: ;@echo "Updating ${PROJECT}....."; 
	git pull
	npm install

clean : ;@echo "Cleaning ${PROJECT}....."; 
	rmdir /s node_modules


.PHONY: test server install clean update