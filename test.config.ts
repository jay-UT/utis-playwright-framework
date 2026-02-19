export class TestConfig {

    appUrl = "https://www.henryschein.co.uk/"
    amazonurl="https://www.amazon.in/"

    //valid login credentials- create your own login account 
    //UK Medical
    username="Naveenkumar" 
    password="Welcome@123" 

    //UK dental
    USERNAME ="Shamrock"
    PASSWORD ="Shamrock@123"


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

    //English info
    BrandENG="Lenovo"
    FreeShipEng="FREE delivery"
    addToCart_eng="Add to cart"
    subTotalEng="Subtotal"
    
    //Tamil info
    BrandTamil="Lenovo"
    FreeShipTamil="இலவச டெலிவரி"
    addToCart_tamil ="கார்ட்டில் சேர்"
    subTotalTamil = "மொத்தம்"

    //Hindi info
    BrandHindi = "Lenovo"
    FreeShipHindi="मुफ़्त डिलीवरी"
    addToCart_hindi="कार्ट में जोड़ें"
    subTotalHindi="उप-योग"

    //Malayalam info
    BrandMalayalam = "Lenovo"
    FreeShipMalayalam="സൗജന്യ ഡെലിവറി"
    addToCart_Malayalam="കാര്‍ട്ടിലേക്ക് ചേർക്കുക"
    SubTotalMalayalam="സബ് ടോട്ടൽ"
}