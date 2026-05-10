
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';



const field = "flex flex-col gap-1";
const label = "text-sm font-medium text-[#1F6F5F]";
const input = "w-full border border-[#EEEEEE] rounded px-3 py-2 text-sm outline-none focus:border-[#2FA084] focus:ring-1 focus:ring-[#2FA084] bg-white placeholder-gray-400";
const errText = "text-red-500 text-xs mt-1";

const SendParcel = () => {
    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            parcelType: "document"
        }
    });
    const region = useLoaderData()
    const district = region.map(r => r.district)
    const regions = region.map(r => r.urban_areas).flat()
    const selectedDistrict = watch('senderDistrict')
    const selectedDistrict2 = watch('receiverDistrict')
    
    // Selected Region based on district functionality
    const findSelectedRegion = (district) => {
        if (!district)
            return [];
        const selectedRegion = region.find(r => r.district === district)
        return selectedRegion.urban_areas
    }
    
    // Form data
    const handleForm = (data) => {
         console.log(data);
    };







    return (

        <>
            <form onSubmit={handleSubmit(handleForm)}>

                <div className="mt-15 p-6 max-w-4xl mx-auto bg-white rounded-lg border border-[#EEEEEE]">
                    <h1 className='text-3xl font-bold mb-8'>Send A Parcel</h1>
                    <h2 className="text-xl font-semibold text-[#1F6F5F] mb-1">
                        Enter your parcel details
                    </h2>
                    <p className="text-sm text-gray-400 mb-5">Fill in all required fields to send your parcel</p>

                    {/* Parcel Type */}
                    <div className="flex gap-6 mb-6">
                        {["document", "not-document"].map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={type}
                                    {...register('parcelType')}
                                    className="accent-[#1F6F5F]"
                                />
                                <span className="text-sm font-medium text-gray-600">
                                    {type === "document" ? "Document" : "Not-Document"}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* Parcel Name & Weight */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#EEEEEE]">
                        <div className={field}>
                            <label className={label}>Parcel Name</label>
                            <input
                                {...register("parcelName", { required: "Parcel name is required" })}
                                placeholder="Enter parcel name"
                                className={input}
                            />
                            {errors.parcelName && <p className={errText}>{errors.parcelName.message}</p>}
                        </div>
                        <div className={field}>
                            <label className={label}>Parcel Weight (KG)</label>
                            <input
                                type="number"
                                step="0.1"
                                {...register("parcelWeight", {
                                    required: "Weight is required",
                                    min: { value: 0.1, message: "Min 0.1 KG" },
                                })}
                                placeholder="e.g. 1.5"
                                className={input}
                            />
                            {errors.parcelWeight && <p className={errText}>{errors.parcelWeight.message}</p>}
                        </div>
                    </div>

                    {/* Sender & Receiver */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Sender */}
                        <div>
                            <h3 className="text-[#1F6F5F] font-semibold mb-4 pb-1 border-b-2 border-[#6FCF97]">
                                Sender Details
                            </h3>
                            <div className="flex flex-col gap-4">
                                <div className={field}>
                                    <label className={label}>Sender Name</label>
                                    <input
                                        {...register("senderName", { required: "Sender name is required" })}
                                        placeholder="Full name"
                                        className={input}
                                    />
                                    {errors.senderName && <p className={errText}>{errors.senderName.message}</p>}
                                </div>
                                <div className={field}>
                                    <label className={label}>Address</label>
                                    <input
                                        {...register("senderAddress", { required: "Address is required" })}
                                        placeholder="Street address"
                                        className={input}
                                    />
                                    {errors.senderAddress && <p className={errText}>{errors.senderAddress.message}</p>}
                                </div>

                                <div className={field}>
                                    <label className={label}>Sender Phone No</label>
                                    <input
                                        {...register("senderPhone", { required: "Phone is required" })}
                                        placeholder="+880..."
                                        className={input}
                                    />
                                    {errors.senderPhone && <p className={errText}>{errors.senderPhone.message}</p>}
                                </div>

                                <div className={field}>
                                    <label className={label}>Your District</label>
                                    <select
                                        {...register("senderDistrict", { required: "District is required" })}
                                        defaultValue=""
                                        className={input}
                                    >
                                        <option value="" disabled>Select your District</option>
                                        {district.map((d) => <option key={d}>{d}</option>)}
                                    </select>
                                    {errors.senderDistrict && <p className={errText}>{errors.senderDistrict.message}</p>}
                                </div>

                                <div className={field}>
                                    <label className={label}>Your Region</label>
                                    <select
                                        {...register("senderRegion", { required: "Region is required" })}
                                        defaultValue=""
                                        className={input}
                                        disabled={!selectedDistrict}
                                    >
                                        <option value="" disabled >
                                            {!selectedDistrict ? 'Choose a district first' : 'Select your Region'}
                                        </option>
                                        {findSelectedRegion(selectedDistrict).map((d) => <option key={d}>{d}</option>)}
                                    </select>
                                    {errors.senderRegion && <p className={errText}>{errors.senderRegion.message}</p>}
                                </div>



                                <div className={field}>
                                    <label className={label}>Pickup Instruction</label>
                                    <textarea
                                        {...register("pickupInstruction")}
                                        placeholder="Any special pickup instructions..."
                                        rows={3}
                                        className={`${input} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Receiver */}
                        <div>
                            <h3 className="text-[#1F6F5F] font-semibold mb-4 pb-1 border-b-2 border-[#6FCF97]">
                                Receiver Details
                            </h3>
                            <div className="flex flex-col gap-4">
                                <div className={field}>
                                    <label className={label}>Receiver Name</label>
                                    <input
                                        {...register("receiverName", { required: "Receiver name is required" })}
                                        placeholder="Full name"
                                        className={input}
                                    />
                                    {errors.receiverName && <p className={errText}>{errors.receiverName.message}</p>}
                                </div>
                                <div className={field}>
                                    <label className={label}>Receiver Address</label>
                                    <input
                                        {...register("receiverAddress", { required: "Address is required" })}
                                        placeholder="Street address"
                                        className={input}
                                    />
                                    {errors.receiverAddress && <p className={errText}>{errors.receiverAddress.message}</p>}
                                </div>
                                <div className={field}>
                                    <label className={label}>Receiver Contact No</label>
                                    <input
                                        {...register("receiverPhone", { required: "Phone is required" })}
                                        placeholder="+880..."
                                        className={input}
                                    />
                                    {errors.receiverPhone && <p className={errText}>{errors.receiverPhone.message}</p>}
                                </div>

                                <div className={field}>
                                    <label className={label}>Receiver District</label>
                                    <select
                                        {...register("receiverDistrict", { required: "District is required" })}
                                        defaultValue=""
                                        className={input}
                                    >
                                        <option value="" disabled>Select your District</option>
                                        {district.map((d) => <option key={d}>{d}</option>)}
                                    </select>
                                    {errors.receiverDistrict && <p className={errText}>{errors.receiverDistrict.message}</p>}
                                </div>


                                <div className={field}>
                                    <label className={label}>Your Region</label>
                                    <select
                                        {...register("receiverRegion", { required: "Region is required" })}
                                        defaultValue=""
                                        className={input}
                                        disabled={!selectedDistrict2}
                                    >
                                        <option value="" disabled>{
                                            !selectedDistrict2
                                                ? 'Choose a district first' : 'Select your Region'}</option>
                                        {findSelectedRegion(selectedDistrict2).map((d) => <option key={d}>{d}</option>)}
                                    </select>
                                    {errors.receiverRegion && <p className={errText}>{errors.receiverRegion.message}</p>}
                                </div>

                                <div className={field}>
                                    <label className={label}>Delivery Instruction</label>
                                    <textarea
                                        {...register("deliveryInstruction")}
                                        placeholder="Any special delivery instructions..."
                                        rows={3}
                                        className={`${input} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#EEEEEE]">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-5 py-2 text-sm border border-[#EEEEEE] rounded text-gray-600 hover:bg-[#EEEEEE]"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm rounded text-white bg-[#1F6F5F] hover:bg-[#2FA084]"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>

    );
};

export default SendParcel;