import {useLoginState} from "../../hooks/loginState";
import {PaymentMethodApi} from "../../api/api2/payment_method";
import {Fragment, useEffect, useMemo, useState} from "react";
import {PaymentMethod} from "../../api/types";
import PaymentMethodDialog from "./payment_method_dialog";
import MC from './master-card.png';
import V from './visa.jpg';
import {Spin} from "antd";

function PaymentMethodForm() {
  let [s, u, token] = useLoginState();
  let [list, setList] = useState<PaymentMethod[]>([]);
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(true);

  let load = useMemo(() => {
    return () => {
      let api = new PaymentMethodApi(token);
      setLoading(true);
      api.list()
        .then(rs => {
          if (rs.success) {
            setList(rs.data);
          }
        })
        .catch(console.log)
        .finally(() => {
          setLoading(false);
        })
    }

  }, [token])

  useEffect(() => {
    load();
  }, [token]);

  return (
    <>
      <div className={"pl-6 pr-20 pt-4"}>
        <div className="text-xl font-bold pb-2">
          Các phương thức thanh toán
        </div>
        {loading && <Spin />}

        <div className={"flex flex-col gap-10 w-full"}>
          {list.map(r => {
            let d = new Date(r.expiry);
            return (
              <Fragment key={r.id}>
                <div className={"mr-10 px-4 py-6 text-lg font-bold flex flex-row gap-4"}
                     style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09)" }}>
                  <img height={28} width={40} src={r.cardNumber.startsWith('5') ? MC : V} alt={""} />
                  <div>
                    {r.cardNumber.slice(0, 6)}****{r.cardNumber.concat(' ').slice(-5, -1)}
                  </div>
                  <div className={"flex flex-grow"}></div>
                  <div>
                    {(d.getMonth() + 1).toString().padStart(2, '0')}/{(d.getFullYear() % 100).toString().padStart(2, '0')}
                  </div>
                </div>
              </Fragment>
            )
          })}
          <div>
            <button
              className={"cursor-pointer bg-[#B9E4D5] disabled:bg-white disabled:text-gray-300 font-bold text-lg uppercase border-0 py-4 px-16 rounded-md"}
              onClick={() => setOpen(true)}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <PaymentMethodDialog open={open} onClose={e => {
        setOpen(false);
        if (e) load();
      }} />
    </>
  )
}

export default PaymentMethodForm;
