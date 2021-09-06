import logo from '../img/logo/logo.jpg'
import { FacebookFilled, TwitterSquareFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons'
import './Footer.css'



const Footer = () => {

    return (

            <div className="Footer">
                <div className="Footer-rss">
                    <FacebookFilled />
                    <TwitterSquareFilled />
                    <InstagramFilled />
                    <LinkedinFilled />
                </div>
                <div>
                    <img id="logo-footer" src={logo} alt="logo"/>
                </div>
                
                <div className="footer-Contact">
                    <h4>Datos de contacto</h4>
                    <p>Inmoweb SL</p>
                    <p><a href="tel:+34986656565"> Tlf: 986 656565</a> </p>
                    <p><a href="mailto:info@inmoweb.com">Mail:info@ingmoweb.com</a></p>
                    <p>Polígono indusrtial el polígono</p>
                    <p> Vigo pontevedra</p>

                </div>
                
               
            </div>
    )
}
export default Footer