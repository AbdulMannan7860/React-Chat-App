const GenderCheck = ({ handleInputChange, input }) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer ${input.gender === "Male" && "selected"}`}>
                    <span className="label-text text-gray-300">Male</span>
                    <input
                        type="checkbox"
                        className="checkbox text-green-500"
                        name="gender"
                        value="Male"
                        checked={input.gender === "Male"}
                        id="Male"
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${input.gender === "Female" && "selected"}`}>
                    <span className="label-text text-gray-300">Female</span>
                    <input
                        type="checkbox"
                        className="checkbox text-green-500"
                        name="gender"
                        value="Female"
                        checked={input.gender === "Female"}
                        id="Female"
                        onChange={handleInputChange}
                    />
                </label>
            </div>
        </div>
    );
}

export default GenderCheck;
