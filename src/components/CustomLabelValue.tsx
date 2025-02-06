function CustomLabelValue({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex border items-center text-xs w-full mb-0.5">
            <div className='w-[30%] h-full p-2 text-white text-left flex items-center bg-[#002855]'>{label}</div>
            <div className='w-[70%] h-full p-2 border-l text-left flex items-center font-[500]'>{value}</div>
        </div>
    )
}

export default CustomLabelValue