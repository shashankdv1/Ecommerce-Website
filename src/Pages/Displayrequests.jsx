import { useState, useEffect } from "react";
import axios from "axios";

function Displayrequests() {
  const [Data, setData] = useState([]);
  const [NoData, setNoData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          "http://localhost:8000/vendor/DisplayRequests"
        );

        if (
          res.data.success &&
          Array.isArray(res.data.Prioritydata)
        ) {
          setData(res.data.Prioritydata);

          if (res.data.Prioritydata.length === 0) {
            setNoData(true);
          }
        } else {
          setNoData(true);
        }
      } catch (error) {
        console.error("Error fetching RequestDatas list:", error);
        setNoData(true);
      }
    }

    fetchData();
  }, []);

  async function handleApproval(priorityRequestId, approval) {
    try {
      const result = await axios.post(
        "http://localhost:8000/vendor/ApproveRequest",
        {
          priorityRequestId: priorityRequestId,
          approval: approval
        },
        {
          withCredentials: true
        }
      );

      console.log(result.data);

      // Remove the processed request from the UI
      setData((previousData) =>
        previousData.filter(
          (request) =>
            request.priorityRequestId !== priorityRequestId
        )
      );

    } catch (error) {
      console.error("Error processing request:", error);
    }
  }

  if (NoData) {
    return (
      <p>There was no priority request data found.</p>
    );
  }

  return (
    <>
      <p>Display Requests</p>

      <div className="flex mt-36">
        {Data.map((RequestData, index) => (
          RequestData &&
          RequestData.priorityRequestId && (
            <ul
              key={RequestData.priorityRequestId || index}
            >
              <li>
                Requested Product Name:{" "}
                {RequestData.productName}
              </li>

              <li>
                Options: {RequestData.options}
              </li>

              <li>
                Request Description:{" "}
                {RequestData.request}
              </li>

              <button
                onClick={() =>
                  handleApproval(
                    RequestData.priorityRequestId,
                    true
                  )
                }
              >
                Approve
              </button>

              <br />

              <button
                onClick={() =>
                  handleApproval(
                    RequestData.priorityRequestId,
                    false
                  )
                }
              >
                Reject
              </button>
            </ul>
          )
        ))}
      </div>
    </>
  );
}

export default Displayrequests;