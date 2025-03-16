## Config ur username and email before commit

git config user.name "username"

git config user.email "example@email.com"

git config --global user.name "username"

git config --global user.email "example@email.com"

go to the repo folder and enter the commands
## Run the app using

npm run dev# Online Pharmacy Management System - Team Responsibilities and Scope

## Project Overview

The Online Pharmacy Management System allows customers to order medicines online and get them delivered to their doorstep.

---

## Team Scope and Required Pages

### **1. Customer Management**

#### **Scope:**

- Customer Profiles
- Registration and Authentication
- Communication and Engagement (Contact us Page)
- Order History
- Data Security and Privacy

#### **Pages:**

1. **Login & Registration Page** (GUI - Forms, Validation, Authentication UI)
2. **User Dashboard** (GUI - Profile Details, Edit Profile Option, Order History)
   
3. **Prescription Status Page for customers ** just create the UI (This frontend fetches Orders status from the DB and shows it to the customer backend is managed by josh)
4. **Delivery Status Page for customers** (This frontend fetches Delivery status from the DB and shows it to the customer backend and status managed by sam)
   
5. **Account Settings Page** (GUI - Change Password)
6. **Order History Page** (GUI - Display Previous Orders, View Details -> when click this customer can see more details about their each order, such as what medicines they ordered etc.)

---

### **2. Inventory Management**

#### **Scope:**

- Product Addition and Updates
- Category Addition and Updates
- Low Stock Alerts
- Reordering (shows a *Order* button to inventory manager when stock reaches ROL, when click that button it send an email to the supplier)
- Batch and Expiry Management
- Generate Reports (Optional)

#### **Pages:**

1. **Main Inventory Dashboard** (GUI - Display Stock Levels, Expiry Alerts) - provides overall status of in brief
2. **Product Management Page** (GUI - Add, Edit, Delete Products) - this page shows all the medicines and some of details of that medicine in a table
	1. Sub page to edit each medicine
3. **Category Management Page** (GUI - Add, Edit, Delete Categories) 
	2. Sub page to edit each category
4. **Stock Alerts Page** (GUI - Notification of Low Stock, Reorder Option page with reorder button Infront of medicines which need reordering)
5. ~~OPTIONAL Supplier Management Page (GUI -to show List of Suppliers with suppliers details such as company details and emails etc.)~~


---

### **3. Prescription Management**

#### **Scope:**

- Prescription Upload and Verification
- Prescription Tracking and Status Updates
- ~~Substitute Medicine Recommendation~~ 
- Refill Management
- Reporting and Analytics
- Security and Privacy (Encryption of Prescriptions)

#### **Pages:**

1. **Pop up or Upload Prescription Page** (GUI - File Upload, Preview Option)
2. Prescription upload queue Management Page for Pharmacist
3. Prescription Viewing and Medicine Detail entering Page 
4. Verified Prescription Page
5. Not Verified Prescription Page
6. Rejected prescription Page
7. ~~**Medicine Recommendation Page** (GUI - Alternative Medicines Display)~~
8. **Refill Subscription Page for customers** (GUI - Auto Refill Options, Subscription Management, this handled automatically by storing customers credit card details of customers and auto charging from them each month when auto refill is placing like real world subscriptions)
9. **Prescription Analytics Page** (GUI - Reports on Orders and Refills)


---

### **4. Product Search & Ordering**

#### **Scope:**

- Advanced Product Search
- Keyword Search
- Filters and Sorting
- Product Details and Information
- Comprehensive Product Pages (When customer click on a medicine they goes to this page to see more details)
- Stock Availability Display
- Order Placement
- Order Reschedule or Cancel the Order (Customer can Reschedule or cancel the within a limited time period for example customer can change order change delivery address or cancel the delivery within a hour )


#### **Pages:**

1. **Product Search Page** (GUI - Search Bar, Filters, Sorting Options)
2. **Product Details Page** (GUI - Display of Medicine Info, Stock Status)
3. **Order Placement Page** (GUI - Add to Cart, Checkout Process)
4. **Cart Page** (GUI - List of Selected Products, Edit Quantity)
5. **Payment Page** (GUI - Payment Gateway, Invoice Generation)

---

### **5. Delivery & Order Tracking**

#### **Scope:**

- Real-Time Order Tracking (Just shows the status of the delivery)
- Delivery Notifications
- Customer Support for Delivery
- Delivery Feedback
- Proof of Delivery
- Delivery History (shows in the admin dashboard)
- AI chat bot for customers to interact with (This chat bot is can provide information about medicines)

#### **Pages:**

1. **Delivery Status Page** (GUI - Pending, Out for Delivery, Delivered)
	1. Subpage for more delivery details. 
2. **Feedback & Ratings Page** (GUI - Review Delivery, Rate Service)
3. **Delivery History Page** (GUI - Past Deliveries with delivered date and delivered items to which customer )
4. AI chat bot for customers to get information

# Pharmacy Management System

## Setup Instructions

### Mail Configuration

- Configure your mail settings in the `.env` file. If you were using Mailtrap, you can remove the following lines:
  ```
  MAIL_MAILER=smtp
  MAIL_HOST=smtp.mailtrap.io
  MAIL_PORT=2525
  MAIL_USERNAME=null
  MAIL_PASSWORD=null
  MAIL_ENCRYPTION=null
  ```

