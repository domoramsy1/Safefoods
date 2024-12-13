    export function generateQrData(user: string, orderDetails: Array<{ name: string; quantity: number; price: number }>) {
        const formattedOrders = orderDetails
        .map(
            (item, index) =>
            `${index + 1}. ${item.name} : ${item.price}x${item.quantity}pcs = P${
                item.price * item.quantity
            }.00`
        )
        .join("\n");
    
        const qrData = `
    User: ${user}
    Order:
    ${formattedOrders}
        `;
        
        return qrData.trim(); // Ensures no leading/trailing whitespace
    }
    