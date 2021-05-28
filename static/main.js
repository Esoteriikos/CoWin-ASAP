
   // <script>
        /* 
        All individual scripts (non-functions) are added under this JQuery document.ready() function 
        so that the <script src=" "> can be linked in <head> tag 
        but all the scripts will start executing only when the page actually loads
        and it will be able to find all the document elements (by id, name, etc.), 
        otherwise the script will not find reference and basically will not run
    */


        // $(document).ready(function () {
        //         $("#enabler").click(function () {
        //             $("#enabler").fadeOut(function () {
        //                 $("#enabler").text('Enabled').fadeIn();
        //             })
        //           })
        //         });

        // $(document).ready(function() 
        // {

        //     if ($("body").hasClass("wrapper")) 
        // {
function verify() {

   var url_string = window.location.href
   var url = new URL(url_string);
   var notification = url.searchParams.get("notification");

   $("#verified").hide();

   if (notification === '1') {
       $("#btn-verifier").show();

   }
   else load();

}

function load() {
   // $("#btn-verifier").click(function(){
   $("#btn-verifier").hide();
   // });
   // $("#verified").click(function(){
   $("#verified").show('slow');
   // });
   // to copy current url
   var $temp = $("<input>");
   var $url = $(location).attr('href');

   $('.clipboard').on('click', function () {
       $("body").append($temp);
       $temp.val($url).select();
       document.execCommand("copy");
       $temp.remove();
       $("#url-copied").text("URL copied!");
   })


   load_update_data();

   setInterval(function () { load_update_data(); }, 30000);
   setInterval(function () { time(); }, 1000);
}

//     }
// });

function time() {
   var update_time = new Date().toLocaleTimeString();
   document.getElementById("time").innerHTML = update_time;

}

// var xhttp = null;

function load_update_data() {

   var data_update = new Date().toLocaleTimeString();
   document.getElementById("data-update-time").innerHTML = "Last Updated On: " + data_update;

   console.log("Updated");

   // fetch , json to html, check and validate conditions
   var url_string = window.location.href
   var url = new URL(url_string);
   // Require for base api
   var district_id = url.searchParams.get("district_id");
   var date = url.searchParams.get("date");

   // Filters
   var dose = url.searchParams.get("dose");
   var pincode = url.searchParams.get("pincode");
   var age = url.searchParams.get("age");
   var vaccine = url.searchParams.get("vaccine");
   var fee = url.searchParams.get("fee");
   var notification = url.searchParams.get("notification");
   var min_doses = url.searchParams.get("min_doses");


   if (min_doses == null || min_doses === '') {
       min_doses = 1;
   }

   // document.getElementById("demo").innerHTML = vaccine; 

   // Regex to check India pincode
   // var pincode_regex = "^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$";
   var pincode_regex = "^[1-9]{1}[0-9]{5}$";
   // validator or checker
   var filter_txt = ""

   // dose
   if (dose == null || dose === '') {
       dose = "any";
   }
   filter_txt += "Dose: " + dose.toUpperCase();


   if (age == null || age === '') age = "any";
   filter_txt += ", Age: " + age.toUpperCase() + "+";

   if (vaccine == null || vaccine === '') vaccine = "any";
   filter_txt += ", Vaccine: " + vaccine.toUpperCase();

   if (fee == null || fee === '') fee = "any";
   filter_txt += ", Fee: " + fee.toUpperCase();

   if (notification == null || notification === '' || notification === "0") filter_txt += ",\n Audio notification: NO";
   else filter_txt += ",\n Audio notification: YES";

   if (pincode == null || pincode == "" || pincode === "any") {
       pincode = 'any';
       filter_txt += ", Pincode: " + pincode.toUpperCase();
   }
   else {
       var result = pincode.toString().match(pincode_regex);
       if (result) {
           filter_txt += ", Pincode : " + pincode.toUpperCase();
       }
       else {
           pincode = 'any';
           filter_txt += ", Pincode: " + pincode.toUpperCase() + " - invalid pincode";
       }
   }

   // Date validation
   // date regex validator Big PP
   // var date_regex = new RegExp(["^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"]);
   // var result = "26/05/2021".match(date_regex);


   // var str = "29-2-2020";
   var patt = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/;
   var valid_date = date.match(patt);
   var to_date_txt = '', from_date;
   var cowin_url_fc = 'find';
   if (valid_date) from_date = date;
   else if (!valid_date && (date == null || date == '' || date.toUpperCase() === 'WEEK' || date.toUpperCase() === 'TODAY' || date.toUpperCase() === 'TOMORROW'))
   // {
   //     filter_txt += "\nDate: "+date;     
   // }

   // else
   {
       // if date is missing or not mentioned: default : week
       if (date == null || date == '') date = 'week';
       // for today and week we need base date to fetch data which is today
       // if tomorrow add 24*60*60*1000 ms 

       var getdate = new Date();

       if (date.toUpperCase() === 'WEEK') {
           var to_date = new Date(getdate.getTime() + (6 * 24 * 60 * 60 * 1000));  //6 because today is 0
           to_date = dateFormatter(to_date);
           to_date_txt = " To " + to_date;
           cowin_url_fc = 'calendar';
       }
       if (date.toUpperCase() === 'TOMORROW') getdate = new Date(getdate.getTime() + (24 * 60 * 60 * 1000)); //86400000

       from_date = dateFormatter(getdate);


   }
   else to_date_txt = "Invalid Date";
   filter_txt += "\nDate: " + from_date + ' ' + to_date_txt;


   document.getElementById("filters-info").innerHTML = "<b>Your Filters:</b>\n" + filter_txt;


   // GET Request
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
           // document.getElementById("id").innerHTML = this.responseText; //to display

           // console.log(this.responseText);

           var data_json = JSON.parse(this.responseText)

           if ("centers" in data_json) {

               // checking for data
               if (data_json.centers.length == 0) {
                   document.getElementById("no-data-msg").innerHTML = "NO DATA FOR ANY SLOTS AVAILABLE FOR NOW";
               }
               // if (data_json.error.length > 0) {
               //     document.getElementById("no-data-msg").innerHTML = "API FAILED TO FETCH BAD REQUEST. TRY AFTER FEW MINUTES. LET OP KNOW.";
               // }
               // json to html table 
               // need to pass json parse 
               var txt = "", records_count = 0, records_success = [];
               var txt_col = "<tr><th>Date</th><th>Center Name</th><th>District</th><th>Pincode</th><th>Vaccine</th><th>Minimum Age</th><th>DOSE 1</th><th>DOSE 2</th><th>Total Doses</th><th>FEE</th></tr>"
               for (var i = 0; i < data_json.centers.length; i++) {
                   for (var j = 0; j < data_json.centers[i].sessions.length; j++) {
                       // console.log(data_json.centers[i].sessions[j].date);
                       // if (date === data_json.centers[i].sessions[j].date)
                       // ~x XOR y
                       // x is not (dd-mm-yyy or today or tommorrow) XOR y : from date matches to date in data
                       if (((valid_date || date.toUpperCase() === 'TODAY' || date.toUpperCase() === 'TOMORROW') && (from_date === data_json.centers[i].sessions[j].date)) || (date.toUpperCase() === '' || date.toUpperCase() == null || date.toUpperCase() === 'WEEK')) {
                           if ((vaccine.toUpperCase() === "COVISHIELD" && data_json.centers[i].sessions[j].vaccine === "COVISHIELD") || (vaccine.toUpperCase() === "COVAXIN" && data_json.centers[i].sessions[j].vaccine === "COVAXIN") || (vaccine.toUpperCase() === "SPUTNIK V" && data_json.centers[i].sessions[j].vaccine === "SPUTNIK V") || vaccine === 'any') {
                               if ((age == 18 && data_json.centers[i].sessions[j].min_age_limit == 18) || (age == 45 && data_json.centers[i].sessions[j].min_age_limit == 45) || age === 'any') {
                                   if ((fee.toUpperCase() === 'FREE' && data_json.centers[i].fee_type === "Free") || (fee.toUpperCase() == 'PAID' && data_json.centers[i].fee_type === "Paid") || fee == 'any') {
                                       if (data_json.centers[i].pincode.toString() === pincode.toString() || pincode == 'any') {
                                           var txt_temp = '', sort_flag = 0;
                                           // to color green or red based on query
                                           if (((dose === "any") && (data_json.centers[i].sessions[j].available_capacity >= min_doses)) || ((dose === "1") && (data_json.centers[i].sessions[j].available_capacity_dose1 >= min_doses)) || ((dose === "2") && (data_json.centers[i].sessions[j].available_capacity_dose2 >= min_doses))) {
                                               txt_temp += "<tr class='record-success'>";
                                               // console.log( data_json.centers[i].center_id);

                                               records_success.push(data_json.centers[i].pincode);
                                               sort_flag = 1;
                                           }
                                           else txt_temp += "<tr class='record-failed'>";
                                           txt_temp += "<td>" + data_json.centers[i].sessions[j].date.split('-').join("/") + "</td>";
                                           // txt_temp += "<td>" + data_json.centers[i].center_id + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].name + "</td>";
                                           // txt_temp += "<td>" + data_json.centers[i].address + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].district_name + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].pincode + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].sessions[j].vaccine + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].sessions[j].min_age_limit + "+</td>";
                                           txt_temp += "<td>" + data_json.centers[i].sessions[j].available_capacity_dose1 + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].sessions[j].available_capacity_dose2 + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].sessions[j].available_capacity + "</td>";
                                           txt_temp += "<td>" + data_json.centers[i].fee_type + "</td>";
                                           txt_temp += "</tr>";

                                           if (sort_flag === 1) txt = txt_temp + txt;
                                           else txt = txt + txt_temp;

                                           // get records in an array to check and display Available 
                                           records_count++;

                                       }
                                   }
                               }
                           }
                       }
                   }
               }
               document.getElementById("cowinData").innerHTML = txt_col + txt;

               console.log(records_count)
               if (records_count === 0) document.getElementById("error-msg").innerHTML = "Data not updated by CoWIN yet OR Did not match any documents \nSuggestions:\nMake sure that filters are correct. Once the data is availabile, it will be displayed.";
               if (records_success.length !== 0) {

                   document.getElementById("available-div").setAttribute("class", "alert alert-success multiline");

                   document.getElementById("available-msg").innerHTML = "SLOTS AVAILABLE";
                   var pincode_txt = ""
                   for (var i = 0; i < records_success.length; i++) pincode_txt += records_success[i] + ', ';
                   // console.log(pincode_txt)
                   document.getElementById("available-at-pincode-msg").innerHTML = pincode_txt;

                   if (notification == 1) {
                       var playsound = document.getElementById('beeper');
                       playsound.play()
                   }

               }
               else {
                   document.getElementById("available-div").setAttribute("class", "alert alert-danger multiline");

                   document.getElementById("available-msg").innerHTML = "NO SLOTS AVAILABLE"

               }
           }
           else if ("error" in data_json) document.getElementById("filters-info").innerHTML = "CoWIN Failed to respond. You might have refresh beyond limit. Try after Few Minutes.";
           // else if ("error" in data_json) document.getElementById("filters-info").innerHTML = "API Failed to Fetch Data : "+data_json.error;
       }

   };
   // var url= "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=392&date=28-5-2021";

   // if invalid dont query api
   if (to_date_txt !== "Invalid Date") {
       var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + district_id + "&date=" + from_date;
       xhttp.open("GET", url, true);
       xhttp.send();
   }
}

// takes new Date() outputs dd-mm-yyyy
function dateFormatter(getdate) {
   var dd = getdate.getDate();
   var mm = getdate.getMonth() + 1;
   var yyyy = getdate.getFullYear();

   // if past 10 am then check for next day
   // var curr_time = new Date().toLocaleTimeString().split(/:| /);
   // if (curr_time[3] == "AM" && curr_time[0] < 10)  dd += 1;

   if (dd < 10) { dd = '0' + dd; }
   if (mm < 10) { mm = '0' + mm; }
   return dd + '-' + mm + '-' + yyyy;


}


        // param = this.responseText
        // function sendToServer(myData) {
            //// value I want to send 
            //// var data1 = this.responseText;

            //// document.getElementById("demo").innerHTML = data_json.centers[0].sessions[0].date;


            //// to send the data to url /xyz 
            //// from flask python we can post the data to process using flask.response.json at given url
            // $.ajax({ 
            //     url: '/print1', 
            //     type: 'POST', 
            //     async: true,
            //     contentType: "application/json; charset=utf-8",
            //     data: myData,
            //     success: function(response){ 
            //         console.log(response)
            //         // $('#main').text(response) 
            //     } 
            // })
    //</script>
