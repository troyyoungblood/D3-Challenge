# D3-Challenge
20210317

The bubble chart is dynamically created based upon an [EV Dataset](assets/data/EVs.csv)- using JavaScript, HTML, and CSS, and D3.js.  The chart is responsive to screen size. Detailed data (State name, number of EV registrations, and the number of Charge Ports) on a bubble is obtained by hovering over the bubble- the user verifies which bubble has been selected by its transition to lime green.  The decision was made to not statically label each bubble because of overlapping bubbles.: <a href="https://troyyoungblood.github.io/D3-Challenge/">View GitHub-Page</a><br>

## D-3 Challenge

This activity is to provide code that will create a dynamic scatter chart using JavaScript, HTML, CSS and D3.

The homework has 2 Levels.  Level 1 is required and Level 2 is Bonus.  Both Levels were completed.  Level 2 will be presented since it incorporates the chart identified in Level 1 along with the additional charts.  The scatter chart has 3 options on each of the x and y axis and the user is able to switch between the options and compare the data accordingly <a href="https://troyyoungblood.github.io/D3-Challenge/"> .



Images of initial rendering and date filtered response.

<img src="/UFO_level_1/static/images/initial_render.PNG" width = "550">
<br>
<img src="/UFO_level_1/static/images/filtered_date.PNG" width = "550">

### II.Level 2: Multiple Search Categories (Optional) - completed

Complete all of Level 1 criteria.

Objective was to use code from Level 1 and add addtional input tags so user can set multiple filters and search for UFO sightings in a more detailed manner.  The additional filters added were:
 - city
 - state
 - country
 - shape

The Javascript, app.js, high-level pseudocode was:
 - render data displaying the full table
 - identify connection (button) between html and JavaScript that would bring desired filter in app.js
 - amend code to use additional filters
 - Using filters in if statements and when criteria met, create new array with only desired data for review
 - Render/display desired data

Images of initial rendering and sample filtered responses.

<img src="/UFO_level_2/static/images/intial_render_l2.PNG" width = "550">
<br>
<img src="/UFO_level_2/static/images/date_filter_l2.PNG" width = "550">
<br>
<img src="/UFO_level_2/static/images/date_s_filter_l2.PNG" width = "550">
<br>
<img src="/UFO_level_2/static/images/date_s_c_filter_l2.PNG" width = "550">
