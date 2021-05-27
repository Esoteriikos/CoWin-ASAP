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



#### NOTE: Few browsers policy restricts website to autoplay audio. If you are not coming from home page or reloaded the website: click at top to enable.


🟩ASAP Access links

Click on the copy url button and save the url 
 No need to select filters again 

Example:
🔸 Mumbai slots ASAP access : https://cowinasap.herokuapp.com/wrapper/?district_id=395

🔸 Thane slots ASAP access : https://cowinasap.herokuapp.com/wrapper/?district_id=392


 🟩 CoWin ASAP as API Wrapper 

https://cowinasap.herokuapp.com/wrapper/?district_id=395&date=28-05-2021&vaccine=any&dose=any&age=any&fee=any&pincode=any&notification=0
Optional parameters :
Everything except district id 
Note : If date parameter is not mentioned - 
Before 10am : Today's date
After 10am : Tomorrow's date

 1. district_id = find your district id from home page
 2. date = dd-mm-yyyy
 3. fee = free or paid
 4. dose = 1 or 2
 5. age = 18 or 45
 6. vaccine = covishield or covaxin or sputnik+v
 7. notification = 0 or 1   if 1 then click enable at top

Example : 
🔸Mumbai 18+  dose 1
https://cowinasap.herokuapp.com/wrapper/?district_id=395&dose=1&age=18



Important District IDs
Mumbai : 395, 
Thane     : 392, 
Chennai  : 571, 
Bangalore Rural : 275, 
Bangalore  Urban : 265
