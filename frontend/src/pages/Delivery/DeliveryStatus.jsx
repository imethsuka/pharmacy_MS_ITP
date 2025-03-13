import './DeliveryStatus.css'
import './BarsV.css'

function DeliveryStatus() {
  

  return (
    <>
     <div>  
     <div className="right-side">
        {/* <button className="signout-btn">
             Sign Out
          </button> */}
        </div>
      <table>
        <tr>
            <th>Customer Name</th>
            <th>Prescription ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        <tr>
            <td>Name1</td>
            <td>S1234</td>
            <td>01.01.2025</td>
            <td class="color">Not yet collected</td>
            <td>View Full Detail</td>
            
        </tr>
        <tr>
            <td>Name2</td>
            <td>S2341</td>
            <td>01.01.2025</td>
            <td class="colora">Delivery in progress</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name3</td>
            <td>S5436</td>
            <td>01.01.2025</td>
            <td class="colorn">Delivery Completed</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name4</td>
            <td>S2389</td>
            <td>01.01.2025</td>
            <td class="color">Not yet collected</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name5</td>
            <td>S2351</td>
            <td>01.01.2025</td>
            <td class="colorn">Delivery Completed</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name6</td>
            <td>S5678</td>
            <td>01.01.2025</td>
            <td class="color">Not yet collected</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name7</td>
            <td>S3452</td>
            <td>01.01.2025</td>
            <td class="colora">Delivery in progress</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name8</td>
            <td>S3451</td>
            <td>01.01.2025</td>
            <td class="colorn">Delivery Completed</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name9</td>
            <td>S6784</td>
            <td>01.01.2025</td>
            <td class="colorn">Delivery Completed</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name10</td>
            <td>S5678</td>
            <td>01.01.2025</td>
            <td class="colora">Delivery in progress</td>
            <td>View Full Detail</td>
        </tr>
        <tr>
            <td>Name11</td>
            <td>S2446</td>
            <td>01.01.2025</td>
            <td class="colorn">Delivery Completed</td>
            <td>View Full Detail</td>
        </tr>
    </table>
       
      </div>
    </>
  )
}

export default DeliveryStatus
