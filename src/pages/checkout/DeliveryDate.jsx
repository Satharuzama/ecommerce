import dayjs from "dayjs";

export function DeliveryDate( {cartItem , deliveryOptions}){
    const selectDeliveryOption = deliveryOptions.find(
       (deliveryOption) => { 
         return deliveryOption.id === cartItem.deliveryOptionId;
       },
     );
    return(
           <div className="delivery-date">
                        Delivery date:{" "}
                        {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format(
                          "dddd",
                          "MMMM D"
                        )}
                      </div>
    );
}