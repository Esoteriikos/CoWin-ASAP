# CoWin-ASAP
🟩 CoWin ASAP : Automatic checker, Quick access to check slots

Having hard time to find Vaccine Slots? 
Use 🔶CoWin ASAP🔶
https://cowinasap.herokuapp.com

 How to use? 
Set your filters and then submit 
Page will reload every 30 seconds (limit is 100 calls per 5 mins )

You can keep this page open.
This works even when browser is minimize and not killed/closed.

As soon as it finds the match, a notification container will turn green and let you know slots are available and at which pincodes.

Audio Notification :
Default : No
If Yes, as soon as match is found, notification sound will be played.


"CoWin Sign in" button : redirects to CoWin registeration in another tab making it easy to login, refer, and book a slot ASAP



🟩ASAP Access links

Click on the copy url button and save the url 
 No need to select filters again 

Example:
🔸 Mumbai slots ASAP access : https://cowinasap.herokuapp.com/wrapper/?district_id=395

🔸 Thane slots ASAP access : https://cowinasap.herokuapp.com/wrapper/?district_id=392


 🟩 CoWin ASAP as API Wrapper 

https://cowinasap.herokuapp.com/wrapper/?district_id=395&date=week&vaccine=any&dose=any&age=any&fee=any&pincode=any&notification=0
Optional parameters :
Everything except district id 


 1. district_id = find your district id from home page
 2. date = dd-mm-yyyy / d-m-yyyy / today / tomorrow / week  
 3. fee = free or paid
 4. dose = 1 or 2
 5. age = 18 or 45
 6. vaccine = covishield or covaxin or sputnik+v
 7. notification = 0 or 1   if 1 then click enable 
 8. min_doses = Natural number (>=1) To filter records on doses available

Example : 
🔸Mumbai 18+  dose 1
https://cowinasap.herokuapp.com/wrapper/?district_id=395&dose=1&age=18



Important District IDs
Mumbai : 395, 
Thane     : 392, 
Chennai   : 571,
New Delhi : 140
Bangalore Rural : 275, 
Bangalore  Urban : 265
