# Gym Coach ![favicon-32x32](https://github.com/EslamSalem/gym-coach/assets/55714424/e5e4f4a3-cb48-49b2-953a-b70f08f9a696)

A website for a gym to manage their clients or enroll new ones. It has all the information needed about the workouts and the nutrition plan.
The Frontend was made by HTML - EJS Templates, CSS, and JavaScript - VueJS. The Backend was made by NodeJS - ExpressJS.
<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/></code>
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="Bootstrap" title="Bootstrap"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117448124-a2da9800-af3e-11eb-85d2-bd1b69b65603.png" alt="Vue.js" title="Vue.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
</div>

# Overview

This section provides a comprehensive overview for the website, outlining the methodology, the tools used, and the approach taken.
<br></br>

### Authentication

Anyone visiting the website for the first time will land at the homepage. The homepage informs the user more about the gym and what they offer in terms of
training and nutrition. If the user wants to join the gym, they create an account and buy a membership. The payment is handled with Stripe API.
<br></br>

![New Incognito Tab - Google Chrome 12_9_2023 12_54_46 PM](https://github.com/EslamSalem/gym-coach/assets/55714424/a3a0f8f0-9832-468a-ae4d-da4aaadfd82c)
<br></br>
![New Incognito Tab - Google Chrome 12_9_2023 12_55_16 PM](https://github.com/EslamSalem/gym-coach/assets/55714424/c1ecab57-f8cc-4292-b4d3-ed3c3f7eaf9c)
<br></br>
![New Incognito Tab - Google Chrome 12_9_2023 12_55_29 PM](https://github.com/EslamSalem/gym-coach/assets/55714424/8e2a8599-b129-4ce5-a134-dbe32cb2e751)
<br></br>
<br></br>

The user fills and submits the signup form.
<br></br>

![gym-coach-2-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/26f2abc5-f4c9-477a-9bdb-95f5f2b72196)
<br></br>
<br></br>

If the user already has an account, they can login instead.
<br></br>

![gym-coach-3-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/592a60ac-daf5-42be-b54b-637ca3c72eaa)
<br></br>
<br></br>

Once the user is logged in, if they don't have a membership, they are redirected to buy one.\
If the payment is successful, they are redirected to their program page where they can view their weekly routine and diet plan once
they've been set. An expiry date of one month is then set and their access will be revoked automatically after that period.
<br></br>

![gym-coach-4-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/af39534e-cf8a-4920-befb-f86f8a5f10f5)
<br></br>
<br></br>

If the payment failed for some reason, he is redirected back to the homepage.
<br></br>

![gym-coach-5-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/726d808f-792d-4a74-9ac3-29e37a6bb6fb)
<br></br>
<br></br>

The user can also edit their name and profile picture.
<br></br>

![gym-coach-12-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/249fb36c-1538-41a8-b11b-5a27ccd48889)
<br></br>
<br></br>

### Administration

Some users are recognized as admins when they login and are given certain management privileges.
<br></br>

![gym-coach-6-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/dc6d647d-07bf-4941-b53d-5fbc48d044b3)
<br></br>
<br></br>

The admin can add workouts to the workouts collection, edit the name of the workout, or delete it from the collection entirely
<br></br>

![gym-coach-7-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/c8b4088e-4e09-413f-9928-e0bff1529ad4)
<br></br>
<br></br>

The admin can create a workout log consisting of several workouts or delete an existing one.
<br></br>

![gym-coach-8-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/1b49f0a2-2453-44b2-a0bf-30247271f188)
<br></br>
<br></br>

After the admin had created the workout log, they can populate it with workouts from the existing workouts collection.
They can choose the workout from a dropdown menu, set the number of sets and reps for the workout, and finally save the workout log
with the chosen workouts. They can also remove a workout from the workout log after it's been set.
<br></br>

![gym-coach-10-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/755ac923-0783-4567-bfb0-9fd8c2d9aca1)
<br></br>
<br></br>

The admin can create a diet plan consisting of several meals or delete an existing one.
<br></br>

![gym-coach-9-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/bc4f8a0a-b71c-4ec8-b79b-006394d8efd0)
<br></br>
<br></br>

After the admin had created the diet plan, they can populate it with meals they specify for each individual plan.
They can also remove a meal from the plan after it's been set.
<br></br>

![gym-coach-11-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/6e5c1169-4e2d-4316-8c8b-f57006cb9b22)
<br></br>
<br></br>

The admin can set a user's weekly routine and diet plan. They can add the number of workout logs they desire to make a weekly routine
for the user by choosing from a number of existing workout logs in a dropdown menu and adding it to the weekly routine.
They can select the diet plan from the existing diet plans in another dropdown menu.
<br></br>

![gym-coach-13-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/658c723e-807f-48ed-8271-618ae6cc0c7f)
<br></br>
<br></br>

The user can view his weekly routine and diet plan from his program page.
<br></br>

![gym-coach-14-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/c6baad55-0aea-4b4a-a29b-26261e8f23e2)
<br></br>

![gym-coach-15-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/5f440830-00e1-4d83-b5d5-b6dd9c0f274a)
<br></br>
<br></br>

The admin can ban a user's access to the site, or he can grant him access for one month.
<br></br>

![gym-coach-16-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/e581b11e-4fd2-4070-bdc1-666113019190)
<br></br>
<br></br>

The admin can edit his name and profile picture after an update. They will be displayed on all the management pages.
<br></br>

![gym-coach-17-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/e32dab02-dcc0-42e2-a22a-a7b52d9f3ee8)
<br></br>
<br></br>


### Responsive Design

This website is completely responsive to the size of the screen and optimized for a mobile or tablet view.
<br></br>

![Screenshot 2023-12-09 181423](https://github.com/EslamSalem/gym-coach/assets/55714424/3150cab9-7bfe-4fc8-b2d9-1c199d24440c)

![Screenshot 2023-12-09 181617](https://github.com/EslamSalem/gym-coach/assets/55714424/8c58207d-c427-4fdb-842d-31ee8e3a150d)

![Screenshot 2023-12-09 181644](https://github.com/EslamSalem/gym-coach/assets/55714424/4718613d-625f-4088-807e-652261650925)

![Screenshot 2023-12-09 182008](https://github.com/EslamSalem/gym-coach/assets/55714424/17ff11c7-e745-45a6-802d-03a58ac5fff0)

![Screenshot 2023-12-09 182037](https://github.com/EslamSalem/gym-coach/assets/55714424/60c54b60-2858-4a82-a423-4a284483c646)

![Screenshot 2023-12-09 182151](https://github.com/EslamSalem/gym-coach/assets/55714424/b38babde-8924-4335-8361-3b3b510b436c)

![Screenshot 2023-12-09 181805](https://github.com/EslamSalem/gym-coach/assets/55714424/51184dba-2398-4755-a36d-ff5ae1d362ef)

![Screenshot 2023-12-09 182236](https://github.com/EslamSalem/gym-coach/assets/55714424/b9999762-188a-4f86-962f-62b6efcf8fa7)

![Screenshot 2023-12-09 183953](https://github.com/EslamSalem/gym-coach/assets/55714424/8264d3b2-d143-4a02-b4af-b988b5e3bafc)

![Screenshot 2023-12-09 183521](https://github.com/EslamSalem/gym-coach/assets/55714424/80822fc3-d9b3-4d80-8d80-6c5da8cbb18e)

![Screenshot 2023-12-09 182344](https://github.com/EslamSalem/gym-coach/assets/55714424/1291efc3-0b84-48de-b50c-3fa15c14399b)

![Screenshot 2023-12-09 183542](https://github.com/EslamSalem/gym-coach/assets/55714424/27d288d8-af37-4c61-a039-da9e2a0a06e6)
