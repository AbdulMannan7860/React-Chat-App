const GenderCheck = () => {
    return <>
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text text-gray-300">Male</span>
                    <input type="checkbox" className="checkbox text-green-500" name="gender" value="male" />
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text text-gray-300">Female</span>
                    <input type="checkbox" className="checkbox text-green-500" name="gender" value="female" />
                </label>
            </div>
        </div>
    </>
}

export default GenderCheck