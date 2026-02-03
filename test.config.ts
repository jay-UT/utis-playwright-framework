export class TestConfig {

    appUrl = "https://www.henryschein.co.uk/"

    //valid login credentials- create your own login account 
    //UK Medical
    username = "Naveenkumar"
    password = "Welcome@123"

    //UK dental
    USERNAME = "Shamrock"
    PASSWORD = "Shamrock@123"


    //invalid login credentials
    invalid_username = `Tester${this.getTimestamp()}`
    invalid_password = "welcome123"

    private getTimestamp(): string {
        const now = new Date()
        return now
            .toTimeString()
            .slice(0, 8)
            .replace(/:/g, "")
    }

}