
## Terminal Commands

1. Create Virtual Environment
    
        mkvirtualenv --python=/usr/bin/python3.5 myenv

2. Install Django Framework
      
        pip install django

3. Install Dependencies by pip

        pip install -r requirements.txt
        
4. Start the virtual environment and Go to the project directory
          
          source bin/activate
          cd IOT_Smart_Agriculture-master
          
          
5. Run Django Server

        python manage.py runserver


So the server will run on the localhost.
<h3>Angular Server:</h3> https://github.com/garvitkataria/IOT_Smart_Agriculture_Angular
<h3>YouTube Link:</h3>: https://youtu.be/eDg2UW-1EYI

# Internet of Things 
### Project Title: IOT Based Smart Agriculture

### Problem Statement:
Farming in India is done using the monotonous ways. The fact that most of our farmers lack proper knowledge makes it even more erratic. A large portion of farming and agricultural activities are based on the predictions, which at times fail. Farmers have to bear huge losses and at times they end up committing suicide. Since we know the benefits of proper soil moisture and its quality, air quality and irrigation, in the growth of crops, such parameters cannot be ignored.

### Project Overview
1. <b>Monitoring of climate conditions:</b><br>
Data collected by smart agriculture sensors, e.g. weather conditions, soil quality, crop’s growth progress. This data is used to track and predict weather conditions.
2. <b>Crop management:</b><br>
Sensors like soil moisture, temperature, humidity, etc. should be placed in the field to collect data specific to crop farming; from temperature and precipitation to leaf water potential and overall crop health.
3. <b>Data analytics:</b><br>
The collected data itself will be of little help if you cannot make sense of it. Thus, we used powerful data analytics and apply predictive algorithms and machine learning in order to obtain actionable insights based on the collected data.
4. <b>The infrastructure:</b><br>
Smart farming applications should be tailored for use in the field. A business owner or farm manager should be able to access the information on site or remotely via a smartphone application or desktop computer.
 
Plus, each connected device should be autonomous and have enough wireless range to communicate with the other devices and send data to the <b>central server(MQTT)</b>.<br>
Protocols in Heterogeneous Architecture. 
<ol>
<li> Raspberry PI (WIFI)</li>
<li> NODEMCU (WIFI)</li>
<li> HC-05 module (Bluetooth)</li>
<li> SIM900A GSM MODEM</li>
</ol>

NLP based <b>Chat Bot</b> to assist the farmers with the agriculture and stocks management.

TechStack:
<ol>
<li> Django BackEnd</li>
<li> React or Angular 4.0 WebApp</li>
<li> Ionic Framework - Mobile Application</li>
<li> MQTT Cloud Server</li>
<li> Google DialogFlow Framework for ChatBot</li>
</ol>

### Block Diagram

![alt text](https://github.com/garvitkataria/IOT_Smart_Agriculture_Angular/blob/master/Screenshot%202018-12-17%20at%201.22.10%20AM.png)

### Architecture Overview

![alt text](https://github.com/garvitkataria/IOT_Smart_Agriculture_Angular/blob/master/Screenshot%202018-12-17%20at%201.22.41%20AM.png)
