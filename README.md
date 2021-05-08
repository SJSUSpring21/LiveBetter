# LiveBetter


House Scoring Project - Approved
---------------------

## Introduction

The house scoring project aims at generating a unique score for every house. The score is calculated by taking into consideration the livability index of the location as well as other economic,social and demographic factors.The generated scroe can in turn help people make informed choices while buying or renting homes.

## Abstract

The motivation of this project is to help home buyers or renters make an informed decision before they choose a place to live. There are many factors that play into deciding where to live. A given location should fit a persons needs and lifestyle. The goal of this project is to consider common factors that contributes to a person's decision on choosing a house.

## Approach

**Input: What information are we going to get from the user?**
> Location Preference: Address

**Process:**
> The various factors taken into consideration to analyze livability includes natural environments, economic prosperity, social stability and equity, educational opportunity, cultural, entertainment and recreation possibilities.

> Examples : Schools, gyms, hospitals, supermarkets, outdoor recreation centers,etc

**Output: What will the output be for our users?**
> Livability score within the range of 1 - 10 

> A brief overview of services nearby: "This location has 3 schools, 1 gym, 20 parks."

## Persona

Our target audience will be individuals looking to buy or rent a home/apartment. This will help users make an informed decision.

## Architecture Diagram
![Diagram](/Live_Better_Architecture_Diagram.jpg)

## Tech Stack ##
- **Frontend:** React, HTML, CSS, Bootsrap

- **Backend:** Node.js, Express

- **Database:** MongoDB, IBM DB2

- **APIs:** Google Autocomplete, Google Places API

## Dataset Links

- [Public Schools](https://hifld-geoplatform.opendata.arcgis.com/datasets/public-schools?geometry=16.974%2C-0.854%2C101.700%2C76.482&orderBy=STATE)

- [Private Schools](https://hifld-geoplatform.opendata.arcgis.com/datasets/private-schools?geometry=22.650%2C-6.081%2C107.377%2C75.201)

- [Colleges and Universities](https://hifld-geoplatform.opendata.arcgis.com/datasets/colleges-and-universities?geometry=137.954%2C-16.798%2C-137.319%2C72.130)

- [Chicago Crime Data](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2/data)

- [Park Data](https://www.tpl.org/parkserve/downloads)

- [Frontend Design Link](https://www.figma.com/file/60RDE2DISTm6t0wSn5nVCZ/LiveBetter?node-id=0%3A1)

## Build Project

1. In backend/.env.dist include your own Google API Key by setting the variable `GOOGLE_API_KEY` to your own key.
2. Change the file name of `.env.dist` to `.env`
3. In the root directory, run the command `docker-compose up --build`
4. Go to `http://localhost:3000` to see project