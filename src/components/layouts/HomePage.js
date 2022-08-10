import React from 'react'
import { useHistory } from "react-router-dom";

function Homepage() {
	const history = useHistory();

	const user = () => {
		history.push("/user")
	}

    const org = () => {
		history.push("/org")
	}
	return (
		<>
            <div>
				<button
					onClick={user}>User
				</button>

                <button
					onClick={org}>Organization 
				</button>
			</div>
		</>
	)
}

export default Homepage
