@echo off

rem Create a virtual environment
python -m venv env

rem Activate the virtual environment
call env\Scripts\activate

rem Install requirements
pip install -r requirements.txt

rem Deactivate the virtual environment
deactivate
