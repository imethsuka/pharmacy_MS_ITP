### **1. Users Table (`users`)**

Stores **customer, pharmacist, inventory manager, and admin** details.

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for the user|
|`name`|String|Full name of the user|
|`email`|String|Unique email (used for login)|
|`password`|String|Hashed password for security|
|`phone`|String|Contact number|
|`address`|String|Home delivery address|
|`role`|String|Role in system: `customer`, `pharmacist`, `inventory_manager`, `admin`|
|`createdAt`|Timestamp|User account creation date|
|`updatedAt`|Timestamp|Last update timestamp|

---

### **2. Medicines Table (`medicines`)**

Stores **medicine details, including stock, category, prescription requirements.**

| Column Name            | Data Type | Description                                             |
| ---------------------- | --------- | ------------------------------------------------------- |
| `_id`                  | ObjectId  | Unique ID for each medicine                             |
| `name`                 | String    | Medicine name                                           |
| `categoryId`           | ObjectId  | Reference to `medicine_categories` table                |
| `description`          | String    | Short description of the medicine                       |
| `howToUse`             | String    | Instructions for usage                                  |
| `sideEffects`          | String    | Possible side effects                                   |
| `price`                | Number    | Price per unit                                          |
| `stock`                | Number    | Available stock count                                   |
| `reorderLevel`         | Number    | If stock reaches this, it needs to be reordered         |
| `batchExpiry`          | Date      | Expiry date of the current batch                        |
| `requiresPrescription` | Boolean   | `true` if a prescription is required, `false` otherwise |
| `supplierEmail`        | String    | Supplier contact for reordering                         |
| `createdAt`            | Timestamp | Medicine entry creation date                            |
| `updatedAt`            | Timestamp | Last update timestamp                                   |
| `uploads`              |           |                                                         |

---

### **3. Medicine Categories Table (`medicine_categories`)**

Stores **categories like Vitamins, Drugs, Medical Equipment, etc.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for category|
|`name`|String|Category name (e.g., Painkillers, Diabetes, Vitamins)|
|`createdAt`|Timestamp|Creation timestamp|
|`updatedAt`|Timestamp|Last update timestamp|

---

### **4. Prescriptions Table (`prescriptions`)**

Stores **uploaded prescriptions, pharmacist verification, and order links.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for prescription|
|`userId`|ObjectId|Reference to `users` table (customer)|
|`prescriptionFile`|String|URL of uploaded prescription image|
|`status`|String|`Pending`, `Verified`, `Rejected`|
|`verifiedBy`|ObjectId|Pharmacist ID who verified the prescription|
|`rejectionReason`|String|Reason for rejection (if applicable)|
|`createdAt`|Timestamp|Upload date|
|`updatedAt`|Timestamp|Last update timestamp|

---

### **5. Orders Table (`orders`)**

Stores **all customer orders, including medicine details.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for the order|
|`userId`|ObjectId|Reference to `users` table (customer)|
|`prescriptionId`|ObjectId|Reference to `prescriptions` table (if needed)|
|`products`|Array|List of medicines in the order (medicineId, quantity)|
|`totalPrice`|Number|Total order amount|
|`status`|String|`Pending`, `Processing`, `Out for Delivery`, `Delivered`, `Cancelled`|
|`orderDate`|Timestamp|Order placement date|
|`updatedAt`|Timestamp|Last update timestamp|

---

### **6. Payments Table (`payments`)**

Stores **customer payment transactions.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for payment|
|`userId`|ObjectId|Reference to `users` table|
|`orderId`|ObjectId|Reference to `orders` table|
|`amount`|Number|Payment amount|
|`paymentMethod`|String|`Credit Card`, `Debit Card`, `Cash on Delivery`|
|`transactionId`|String|Unique transaction ID from the payment gateway|
|`status`|String|`Success`, `Failed`, `Pending`|
|`createdAt`|Timestamp|Payment timestamp|

---

### **7. Refill Subscriptions Table (`refill_subscriptions`)**

Stores **customer subscriptions for automatic refills.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for subscription|
|`userId`|ObjectId|Reference to `users` table|
|`medicineId`|ObjectId|Reference to `medicines` table|
|`frequency`|String|`Monthly`, `Biweekly`, `Weekly`|
|`nextRefillDate`|Date|Next refill scheduled date|
|`autoCharge`|Boolean|`true` if automatically charged|
|`paymentMethod`|String|Payment method for auto-refill|
|`createdAt`|Timestamp|Subscription creation date|

---

### **8. Deliveries Table (`deliveries`)**

Stores **order delivery details.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for delivery|
|`orderId`|ObjectId|Reference to `orders` table|
|`deliveryStatus`|String|`Pending`, `Out for Delivery`, `Delivered`|
|`deliveryPerson`|String|Name of delivery personnel|
|`deliveryDate`|Date|Expected delivery date|
|`proofOfDelivery`|String|Image URL of signature or proof|
|`createdAt`|Timestamp|Delivery entry creation date|

---

### **9. Inventory Management Table (`inventory`)**

Stores **stock details & supplier email alerts.**

|Column Name|Data Type|Description|
|---|---|---|
|`_id`|ObjectId|Unique ID for inventory entry|
|`medicineId`|ObjectId|Reference to `medicines` table|
|`batchNo`|String|Batch number of the stock|
|`quantity`|Number|Current stock count|
|`expiryDate`|Date|Expiry date of batch|
|`supplierEmail`|String|Supplier email for reordering|
|`reorderLevel`|Number|If stock reaches this, reorder is required|
