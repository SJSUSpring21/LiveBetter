# LiveBetter


House Scoring Project - Approved
---------------------

**Introduction**

The house scoring project aims at generating a unique score for every house. The score is calculated by taking into consideration the livability index of the location as well as other economic,social and demographic factors.The generated scroe can in turn help people make informed choices while buying or renting homes.

**Abstract**

The motivation of this project is to help home buyers or renters make an informed decision before they choose a place to live. There are many factors that play into deciding where to live. A given location should fit a persons needs and lifestyle. The goal of this project is to consider common factors that contributes to a person's decision on choosing a house.

**Approach**

Input: What information are we going to get from the user? 
> Location Prefernce (address, or neighborhood)

Process:
> The various factors taken into consideration to analyze livability includes natural environments, economic prosperity, social stability and equity, educational opportunity, cultural, entertainment and recreation possibilities.
> Examples : Schools, gyms, hospitals, supermarkets, outdoor recreation centers,etc

Output: What will the output be for our users?
> Livability score within the range of 1 - 10 
> A brief description of services nearby: "This location has 3 schools within 2 miles. 1 gym within 1 mile."

**Persona**

Our target audience will be individuals looking to buy or rent a home/apartment. This will help users make an informed decision.

**Dataset Links**

Realtor API, ATTOM Property API, Zillow API

[Design Link](https://www.figma.com/file/60RDE2DISTm6t0wSn5nVCZ/LiveBetter?node-id=0%3A1)

**Build Project**

In backend/.env.dist include your own Google API Key by setting your API to the variable GOOGLE_API_KEY.

Then, change the file name of .env.dist to .env
> docker-compose up --build

Go to localhost:3000 to see project