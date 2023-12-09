# Gym Coach ![favicon-32x32](https://github.com/EslamSalem/gym-coach/assets/55714424/e5e4f4a3-cb48-49b2-953a-b70f08f9a696)

A website for a gym to manage their clients or enroll new ones. It has all the information needed about the workouts and the nutrition plan.
The Frontend was made by HTML - EJS Templates, CSS, Bootstrap Elements, and JavaScript - VueJS. The Backend was made by NodeJS - ExpressJS.
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

### Authentication
Anyone visiting the website for the first time will land at the homepage. The homepage informs the user more about the gym and what they offer in terms of
training and nutrition. If the user wants to join the gym, he creates an account and buys a membership. The payment was handled with Stripe API.

![New Incognito Tab - Google Chrome 12_9_2023 12_54_46 PM](https://github.com/EslamSalem/gym-coach/assets/55714424/a3a0f8f0-9832-468a-ae4d-da4aaadfd82c)
![New Incognito Tab - Google Chrome 12_9_2023 12_55_16 PM](https://github.com/EslamSalem/gym-coach/assets/55714424/c1ecab57-f8cc-4292-b4d3-ed3c3f7eaf9c)
![New Incognito Tab - Google Chrome 12_9_2023 12_55_29 PM](https://github.com/EslamSalem/gym-coach/assets/55714424/8e2a8599-b129-4ce5-a134-dbe32cb2e751)

The user fills and submits the signup form.

![gym-coach-2-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/26f2abc5-f4c9-477a-9bdb-95f5f2b72196)

If the user already has an account, he can login instead.

![gym-coach-3-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/592a60ac-daf5-42be-b54b-637ca3c72eaa)

Once the user is logged in, if he doesn't have a membership, he is redirected to buy one.\
If the payment is successful, he is redirected to his program page.

![gym-coach-4-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/af39534e-cf8a-4920-befb-f86f8a5f10f5)

If the payment failed for some reason, he is redirected back to the homepage.

![gym-coach-5-Made-with-Clipchamp](https://github.com/EslamSalem/gym-coach/assets/55714424/726d808f-792d-4a74-9ac3-29e37a6bb6fb)

### Administration
### Responsive Design

