const BgBlackBtn = ({text}: {text:string}) => {
    return (
        <button className="bg-black text-gray-50 font-inter font-semibold px-6 py-2 rounded-3xl hover:bg-gray-900 transition tracking-tight">{text}</button>
    )
}

export default BgBlackBtn;