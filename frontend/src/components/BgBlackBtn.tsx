const BgBlackBtn = ({text}: {text:string}) => {
    return (
        <button className="bg-black text-gray-50 font-inter font-bold text-lg px-6 py-3 rounded-4xl hover:bg-gray-900 transition tracking-tight">{text}</button>
    )
}

export default BgBlackBtn;