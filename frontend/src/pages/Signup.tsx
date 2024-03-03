import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup= () => {

    return <div>
        <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
                <Auth type="signup"/>
            </div>
            <div className="hidden lg:block col-span-6">
                <Quote/>
            </div>
        </div>       
    </div>
}