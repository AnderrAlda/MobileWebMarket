import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";
import { getDiscount } from "../../../services/auth.service";

const OrderedPage = () => {
  const { totalPrice } = useContext(CartContext);

  // Function to clear the cartId from localStorage
  const handleContinueShopping = () => {
    localStorage.removeItem("cartData");
  };

  const [discount, setDiscount] = useState<number>(0);

  // Define an async function to fetch the discount
  const fetchDiscount = async () => {
    try {
      // Call getDiscount function to fetch the discount
      const discountData = await getDiscount();
      // Set the discount state with the fetched discount value
      setDiscount(discountData);
    } catch (error) {
      console.error("Error fetching discount:", error);
    }
  };

  // Call fetchDiscount function when the component mounts
  useEffect(() => {
    fetchDiscount();
  }, []);

  const discountedAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountedAmount;

  return (
    <>
      <div className="flex justify-center mt-32">
        <div>
          <svg
            width="101"
            height="101"
            viewBox="0 0 101 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M100.938 28.177C97.7461 16.2671 86.0265 8.88376 74.0941 10.8315V10.8279H72.1427C64.1791 10.8496 56.6799 7.08279 51.9428 0.681701C51.261 -0.227234 49.7388 -0.227234 49.0535 0.681701C44.3183 7.08313 36.8199 10.8502 28.8572 10.8279H26.8913C14.9769 8.88376 3.25016 16.2707 0.0614582 28.177C-0.195381 29.1391 0.376259 30.1273 1.33838 30.3844L43.8664 41.7785C44.3285 41.9031 44.8211 41.8389 45.2359 41.6001C45.6506 41.3613 45.9534 40.9675 46.0776 40.5053C48.9164 29.9083 44.0973 19.0552 35.0398 13.7747C41.0432 12.4663 46.4647 9.25731 50.4999 4.62403C54.5343 9.25758 59.9564 12.4656 65.9601 13.7711C56.9062 19.048 52.0835 29.9047 54.9259 40.5017C55.1879 41.4615 56.1753 42.0301 57.137 41.7749L99.6651 30.3808C100.625 30.1238 101.195 29.1371 100.938 28.177ZM90.705 49.977C91.0443 50.3143 91.5034 50.5037 91.9819 50.5036C92.4595 50.5043 92.9176 50.3148 93.2552 49.977L98.6659 44.5667C99.37 43.8624 99.37 42.7208 98.6659 42.0166L93.2552 36.6063C92.5509 35.9022 91.4093 35.9022 90.705 36.6063L85.2943 42.0166C84.5902 42.7208 84.5902 43.8624 85.2943 44.5667L90.705 49.977ZM7.74103 57.1908C8.08037 57.5281 8.53945 57.7174 9.01796 57.7174C9.49553 57.7181 9.95371 57.5286 10.2913 57.1908L15.702 51.7804C16.406 51.0762 16.406 49.9346 15.702 49.2304L10.2913 43.82C9.58698 43.116 8.44532 43.116 7.74103 43.82L2.33034 49.2304C1.62626 49.9346 1.62626 51.0762 2.33034 51.7804L7.74103 57.1908ZM24.6152 82.9656C23.9331 82.9639 23.3099 82.5791 23.0028 81.9701L21.3002 78.5724C19.8108 75.6003 20.3937 72.0083 22.7467 69.6598C23.5403 68.8663 23.9659 67.8347 23.9659 66.7346C23.9659 65.6345 23.5403 64.6029 22.7611 63.8238C20.3987 61.4751 19.8097 57.8759 21.3002 54.8968L23.0028 51.4991C23.448 50.6077 24.5317 50.2459 25.4232 50.6912C26.3147 51.1364 26.6764 52.22 26.2312 53.1114L24.5286 56.5127C23.735 58.0997 24.0452 60.0077 25.3005 61.2593C26.7722 62.7309 27.5766 64.6678 27.5766 66.7346C27.5766 68.8013 26.7722 70.7346 25.315 72.1918C24.0506 73.4432 23.7333 75.3652 24.5286 76.9565L26.2312 80.3542C26.5116 80.9138 26.4818 81.5788 26.1524 82.1111C25.823 82.6434 25.2412 82.9668 24.6152 82.9656ZM81.1605 101C80.5353 100.999 79.955 100.675 79.626 100.144C79.2971 99.6122 79.2663 98.9484 79.5445 98.3886L81.2471 94.9909C82.0406 93.4075 81.7304 91.4959 80.4752 90.2443C77.453 87.2309 77.4449 82.3387 80.4571 79.3154C81.7304 78.0422 82.037 76.1341 81.2471 74.5507L79.5445 71.153C79.0993 70.2616 79.461 69.178 80.3525 68.7328C81.244 68.2876 82.3276 68.6493 82.7729 69.5407L84.4755 72.9384C85.9626 75.9109 85.3799 79.5014 83.029 81.851C82.253 82.6213 81.8151 83.6684 81.8117 84.7617C81.8083 85.855 82.2398 86.9048 83.011 87.6798C85.3808 90.0495 85.9616 93.6275 84.4755 96.6104L82.7729 100.008C82.4642 100.615 81.8415 100.998 81.1605 101ZM6.1575 50.5036L9.01796 53.3639L11.8784 50.5036L9.01796 47.6433L6.1575 50.5036ZM36.5981 96.8665C36.9374 97.2038 37.3965 97.3932 37.875 97.3931C38.3525 97.3938 38.8107 97.2043 39.1483 96.8665L44.559 91.4562C45.2631 90.7519 45.2631 89.6104 44.559 88.9061L39.1483 83.4958C38.444 82.7917 37.3023 82.7917 36.5981 83.4958L31.1874 88.9061C30.4833 89.6104 30.4833 90.7519 31.1874 91.4562L36.5981 96.8665ZM35.0145 90.1793L37.875 93.0396L40.7354 90.1793L37.875 87.3191L35.0145 90.1793ZM89.1214 43.2898L91.9819 46.1501L94.8423 43.2898L91.9819 40.4296L89.1214 43.2898ZM61.8479 93.2596C62.1873 93.597 62.6464 93.7863 63.1249 93.7862C63.8531 93.7846 64.5089 93.3452 64.7874 92.6724C65.0658 91.9995 64.9123 91.2253 64.3982 90.7096L60.7911 87.1027C60.0834 86.4192 58.9585 86.429 58.2628 87.1246C57.5671 87.8203 57.5573 88.9451 58.2408 89.6527L61.8479 93.2596ZM91.9819 97.3931C91.253 97.393 90.5959 96.9541 90.3165 96.2809C90.0371 95.6078 90.1904 94.8326 90.705 94.3164L94.3121 90.7096C95.0198 90.0261 96.1447 90.0359 96.8404 90.7315C97.5361 91.4272 97.5458 92.552 96.8623 93.2596L93.2552 96.8665C92.9176 97.2043 92.4595 97.3938 91.9819 97.3931ZM10.9597 99.8878C11.239 100.561 11.8962 101 12.6251 101C13.1027 101.001 13.5608 100.811 13.8984 100.473L17.5055 96.8665C18.189 96.1589 18.1793 95.034 17.4836 94.3384C16.7879 93.6428 15.663 93.633 14.9553 94.3164L11.3482 97.9233C10.8336 98.4395 10.6803 99.2147 10.9597 99.8878ZM4.09062 27.3871L42.9791 37.8038C44.7628 27.4981 38.3983 17.5313 28.2981 14.8135C23.1222 13.4105 17.6001 14.1379 12.9642 16.8333C8.85183 19.192 5.70806 22.931 4.09062 27.3871ZM58.0208 37.8038C57.0022 31.9209 58.6339 25.8886 62.479 21.321C66.3241 16.7535 71.9902 14.1171 77.961 14.1173C81.4671 14.1173 84.9227 15.0371 88.0357 16.8333C92.1486 19.1912 95.2926 22.9306 96.9092 27.3871L58.0208 37.8038ZM26.5254 44.565C27.2297 43.8607 27.2297 42.7189 26.5253 42.0146C25.821 41.3103 24.679 41.3103 23.9747 42.0146C23.2704 42.7189 23.2704 43.8608 23.9747 44.5651C24.6791 45.2694 25.821 45.2693 26.5254 44.565ZM63.1249 63.1277C63.1249 64.1237 63.9324 64.9311 64.9284 64.9311C66.9206 64.9311 68.5356 66.546 68.5356 68.538C68.5356 70.5301 66.9206 72.1449 64.9284 72.1449C63.9324 72.1449 63.1249 72.9523 63.1249 73.9484C63.1249 74.9444 63.9324 75.7518 64.9284 75.7518C65.9204 75.7518 66.732 76.5634 66.732 77.5552C66.732 78.5471 65.9204 79.3587 64.9284 79.3587C63.9324 79.3587 63.1249 80.1661 63.1249 81.1621C63.1249 82.1581 63.9324 82.9656 64.9284 82.9656C66.9797 82.9697 68.8564 81.8121 69.7731 79.9772C70.6898 78.1423 70.4885 75.9466 69.2534 74.3091C71.01 72.9889 72.1427 70.8933 72.1427 68.538C72.1427 66.5215 71.3114 64.6958 69.9734 63.3856C72.3692 61.7634 73.9463 59.0201 73.9463 55.9139C73.9463 50.94 69.9027 46.8967 64.9284 46.8967C63.9324 46.8967 63.1249 47.7042 63.1249 48.7002C63.1249 49.6962 63.9324 50.5036 64.9284 50.5036C67.9115 50.5036 70.3391 52.931 70.3391 55.9139C70.3391 58.8968 67.9115 61.3243 64.9284 61.3243C64.8662 61.3243 64.8047 61.3274 64.744 61.3336C63.8346 61.4259 63.1249 62.1939 63.1249 63.1277ZM36.0714 70.3415C36.0714 71.3375 36.8789 72.1449 37.875 72.1449C41.8536 72.1449 45.0892 68.9095 45.0892 64.9311C45.0892 62.5722 43.953 60.4766 42.1999 59.1601C43.4234 57.5199 43.6183 55.3304 42.7037 53.4999C41.7892 51.6695 39.9213 50.5104 37.875 50.5036C36.8789 50.5036 36.0714 51.311 36.0714 52.307C36.0714 53.3031 36.8789 54.1105 37.875 54.1105C38.8669 54.1105 39.6785 54.922 39.6785 55.9139C39.6785 56.9058 38.8669 57.7174 37.875 57.7174C36.8789 57.7174 36.0714 58.5248 36.0714 59.5208C36.0714 60.5168 36.8789 61.3243 37.875 61.3243C39.8671 61.3243 41.4821 62.9391 41.4821 64.9311C41.4821 66.9232 39.8671 68.538 37.875 68.538C36.8789 68.538 36.0714 69.3455 36.0714 70.3415ZM91.9819 86.5725C90.9858 86.5725 90.1783 85.765 90.1783 84.769C90.1783 83.773 90.9858 82.9656 91.9819 82.9656C92.9739 82.9656 93.7855 82.154 93.7855 81.1621C93.7855 80.1702 92.9739 79.3587 91.9819 79.3587C90.9858 79.3587 90.1783 78.5513 90.1783 77.5552C90.1783 76.5592 90.9858 75.7518 91.9819 75.7518C92.9739 75.7518 93.7855 74.9403 93.7855 73.9484C93.7855 72.9565 92.9739 72.1449 91.9819 72.1449C90.9858 72.1449 90.1783 71.3375 90.1783 70.3415C90.1783 69.3455 90.9858 68.538 91.9819 68.538C92.9739 68.538 93.7855 67.7265 93.7855 66.7346C93.7855 65.7427 92.9739 64.9311 91.9819 64.9311C90.9858 64.9311 90.1783 64.1237 90.1783 63.1277C90.1783 62.1317 90.9858 61.3243 91.9819 61.3243C94.1119 61.332 96.0398 62.5871 96.9087 64.5318C97.7776 66.4764 97.4264 68.7497 96.0111 70.3415C97.858 72.3914 97.858 75.5053 96.0111 77.5552C97.4264 79.147 97.7776 81.4203 96.9087 83.3649C96.0398 85.3096 94.1119 86.5647 91.9819 86.5725ZM9.01796 90.1793C6.88791 90.1716 4.96007 88.9165 4.09114 86.9718C3.22222 85.0272 3.57347 82.7539 4.98879 81.1621C3.14181 79.1122 3.14181 75.9983 4.98879 73.9484C3.57347 72.3566 3.22222 70.0833 4.09114 68.1387C4.96007 66.194 6.88791 64.9389 9.01796 64.9311C10.014 64.9311 10.8215 65.7386 10.8215 66.7346C10.8215 67.7306 10.014 68.538 9.01796 68.538C8.026 68.538 7.21439 69.3496 7.21439 70.3415C7.21439 71.3334 8.026 72.1449 9.01796 72.1449C10.014 72.1449 10.8215 72.9523 10.8215 73.9484C10.8215 74.9444 10.014 75.7518 9.01796 75.7518C8.026 75.7518 7.21439 76.5633 7.21439 77.5552C7.21439 78.5471 8.026 79.3587 9.01796 79.3587C10.014 79.3587 10.8215 80.1661 10.8215 81.1621C10.8215 82.1581 10.014 82.9656 9.01796 82.9656C8.026 82.9656 7.21439 83.7771 7.21439 84.769C7.21439 85.7609 8.026 86.5725 9.01796 86.5725C10.014 86.5725 10.8215 87.3799 10.8215 88.3759C10.8215 89.3719 10.014 90.1793 9.01796 90.1793ZM39.1492 76.2775C39.8536 76.9817 39.8536 78.1236 39.1493 78.8279C38.4449 79.5322 37.303 79.5322 36.5986 78.8279C35.8943 78.1237 35.8943 76.9818 36.5986 76.2775C37.3029 75.5732 38.4449 75.5732 39.1492 76.2775ZM71.6124 96.8598C72.3167 96.1555 72.3167 95.0136 71.6123 94.3093C70.908 93.605 69.766 93.6051 69.0617 94.3094C68.3574 95.0137 68.3574 96.1555 69.0617 96.8598C69.7661 97.5641 70.908 97.5641 71.6124 96.8598ZM24.7233 87.097C25.4276 87.8013 25.4276 88.9432 24.7233 89.6475C24.019 90.3518 22.877 90.3518 22.1727 89.6475C21.4683 88.9433 21.4683 87.8014 22.1726 87.0971C22.8769 86.3928 24.0189 86.3928 24.7233 87.097ZM87.8444 58.9875C88.5487 58.2832 88.5487 57.1413 87.8444 56.437C87.14 55.7327 85.9981 55.7328 85.2938 56.4371C84.5894 57.1414 84.5894 58.2832 85.2938 58.9875C85.9981 59.6918 87.1401 59.6918 87.8444 58.9875Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <p className="text-2xl font-bold ml-24 mt-5">Order completed!</p>

      <div className="mt-12 flex justify-around">
        <div>
          <p className="text-gray-500">Order</p>
          <p className="text-gray-500 text-lg">Delivery</p>
          <p className="text-gray-500 text-lg">Discount</p>
          <p className="text-gray-500 text-xl">Summary</p>
        </div>
        <div>
          <p className="text-gray-500">{totalPrice}$</p>
          <p className="text-gray-500 text-lg">7.20$</p>
          <p className="text-gray-500 text-lg">{discount}%</p>
          <p className="text-gray-500 text-xl">{finalPrice + 7.2}$</p>{" "}
        </div>
      </div>

      <div className="mt-20">
        <Link to="/private/">
          <button
            onClick={handleContinueShopping}
            className="bg-black text-white rounded-xl p-3 ml-12 mt-4 w-72   flex justify-around"
          >
            <p className="font-bold">Continue Shopping</p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default OrderedPage;
