import React from "react";
import { useForm,  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { State, City } from "country-state-city";
import { CheckoutSchema } from "../../../schema/CheckoutSchema";


const CheckoutForm = ({onSubmit, user}) => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            country: "India",
            state: user?.address?.state,
            city: user?.address?.city
        }
    })

  return (
    <div className="box address__col">
        <div className="heading">
        <h2>Shipping Address</h2>
        </div>

        <form className="input__main__container" onSubmit={handleSubmit(onSubmit)}>
            <div className="box">
                <input type="text" {...register("country")} value={"India"} disabled/>
            </div>

            <div className="input__row">
                <div className="box">
                    <label htmlFor="am">Full Name</label>
                <input
                    id="em"
                    type="text"
                    {...register("name")}
                    placeholder="Full name"
                    defaultValue={user?.name}
                />
                {errors?.name && <span className="errors">{errors?.name?.message}</span>}
                </div>
                <div className="box">
                    <label htmlFor="pn">Phone Number</label>
                <input
                    id="pn"
                    type="number"
                    {...register("phoneNumber")}
                    placeholder="Phone number"
                    defaultValue={user?.phoneNumber}
                />
                {errors?.phoneNumber && <span className="errors">{errors?.phoneNumber?.message}</span>}
                </div>
            </div>
            <div className="box">
                <label htmlFor="">Email</label>
                <input
                type="text"
                {...register("email")}
                placeholder="Email"
                defaultValue={user?.email}
                />
                {errors?.email && <span className="errors">{errors?.email?.message}</span>}
            </div>
            <div className="box">
                <label htmlFor="add1">Address line 1</label>
                <input
                id="add1"
                type="text"
                {...register("address1")}
                placeholder="Apartment, suit, etc. (optional)"
                defaultValue={user?.address?.address1}
                />
                {errors?.address1 && <span className="errors">{errors?.address1?.message}</span>}
            </div>
            <div className="box">
                <label htmlFor="add2">Address line 2 <span>Optional</span></label>
                <input
                id="add2"
                type="text"
                {...register("address2")}
                placeholder="Address"
                defaultValue={user?.address?.address2}
                />
                {errors?.address2 && <span className="errors">{errors?.address2?.message}</span>}
            </div>

            <div className="input__row">
                <div className="box">
                    <label htmlFor="state">State</label>
                <select
                    id="state"
                    {...register("state")}
                    >
                    <option value="">choose Your state</option>
                    {State &&
                        State.getStatesOfCountry("IN").map((item, i) => (
                        <option key={i} value={item.isoCode}>
                            {item.name}
                        </option>
                    ))}
                </select>
                {errors?.state && <span className="errors">{errors?.state?.message}</span>}
                </div>
                <div className="box">
                    <label htmlFor="city">City</label>
                <select
                    id="city"
                    {...register("city")}
                    >
                    <option value="">choose Your city</option>
                    {City &&
                        City.getCitiesOfState("IN", watch("state")).map((item, i) => (
                        <option key={i} value={item.isoCode}>
                            {item.name}
                        </option>
                    ))}
                </select>
                {errors?.city && <span className="errors">{errors?.city?.message}</span>}
                </div>
                <div className="box">
                    <label htmlFor="pin">PinCode</label>
                <input
                    id="pin"
                    type="text"
                    {...register("pincode")}
                    placeholder="PIN code"
                    defaultValue={user?.address?.pincode}
                />
                {errors?.pincode && <span className="errors">{errors?.pincode?.message}</span>}
                </div>
            </div>
            <input type="submit" value={"Process To Pay"} className="btn-main btn"/>
        </form>
    </div>
  )
}

export default CheckoutForm