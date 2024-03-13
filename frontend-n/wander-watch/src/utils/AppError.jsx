import { AxiosError } from "axios";

class AppError extends AxiosError {
    constructor(error) {
        super(error.response.data.message ? error.response.data.message : error)
        this.name = "Request Error"
        this.code = error.code
        this.response = error.response
        this.config = error.config

    }
}

export default AppError