# GoGoal

GoGoal is a comprehensive booking application with two modules: Admin, User. This app allows users to view and book GoGoal grounds, admins to oversee all activities within the platform.

## Features

### User Module

- **Browse GoGoal**: Users can view various turfs, check their details, and select time slots for booking.
- **Slot Booking**: Purchase time slots using Razorpay. After booking, users receive a confirmation email with all the booking details, including price, turf name, start time, end time, and a QR code containing all these details.
- 
### Admin Module
- **User Management**: Admins can view all users and owners registered on the platform.
- **GoGoal Management**: Admins can view all turfs listed by owners and manage them as necessary.
- **Transaction Overview**: Admins have access to all transactions on the platform and can view transaction data on a monthly basis in graph format.

---

## 🌐 URLs

- **User App**: https://gogoal-official-website.vercel.app/
- **Admin App**: https://gogoal-official-website.vercel.app/auth/admin

> 🛠️ **Note**: Admin accounts are created directly in the database.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, DaisyUI, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payments**: Razorpay
- **Image Hosting**: Cloudinary



## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/RijoKsd/TurfSpot.git
   ```
2. Install dependencies for both client and server
   ```bash
   cd client/user
   npm install
   cd server
   npm install
   cd ../client
   npm install
   cd ../user
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following environment variables:

   ```env
    PORT = your_port
    MONGO_URI=your_mongo_uri

    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    OWNER_URL = your_owner_url
    USER_URL = your_user_url

    EMAIL = your_email for sending emails
    PASSWORD = your_password for sending emails(you will get from app password in google account)

    RAZORPAY_KEY_ID = your_razorpay_key_id
    RAZORPAY_SECRET_KEY = your_razorpay_secret_key
   
    JWT_SECRET = your_jwt_secret


   ```

4. Run the application

   ```bash
   # To run the backend
   cd server
   npm run server

   # To run the owner client
   cd ../client/owner
   npm run dev

   # To run the user client
   cd ../user
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or questions, please contact us at 00962788246916

