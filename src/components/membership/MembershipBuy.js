import './ProductBuy.scss'

class ProductBuy extends React.Component {
    render() {
        return(
            <div className="wrapper-decoration">
                {/*<header className="header">
                    <div className="middle-container">
                        <img className="logo" src="https://s3.amazonaws.com/samcart-foundation-prod/marketplace-5232/mAVgI7IjeLyzD2Tl31tNA7m61RUdEL.png"/>
                        <div className="hide-on-mobile">
                            <h1>
                                <span className="hide-help">Need Help? </span>
                                <span>support@iifym.com</span>
                            </h1>
                        </div>
                    </div>
                </header>*/}
                <header className="header"></header>
                <div className="checkout-container">
                    <div className="middle-container">
                        <div className="about-product">
                            <img className="prodct-image" 
                                src="https://s3.amazonaws.com/samcart-foundation-prod/marketplace-5232/uMv49lWGVHwQ9ykMxodN4lVnrwYJDZ.jpg"/>
                                
                            <hgroup>
                                <h1 className="has-image product-title">Custom Macro Blueprint</h1>
                                <div className="customize-text">
                                    The IIFYM Macro Blueprint is a customized program designed for you based on your body, energy and goals by an IIFYM coach and it is guaranteed to work! Please allow 3 - 5 business days for delivery.
                                </div>
                            </hgroup>
                           
                            <div className="money-back-color days">
                                <img src="https://d2n844f18s487r.cloudfront.net/modules/templates/classic/img/30-day.png" className="money-back-color"/>
                            </div>
                        </div>
                        <div className="checkout-forms">
                            <div className="row">
                                <div className="col-md-7 checkout-input-container">
                                    <div className="section-title">
                                        <h1>Contact Information</h1>
                                        <p>Fields marked with 
                                            <span>*</span> are mandatory
                                        </p>
                                    </div>
                                    <div className="checkout-form">
                                        <form id="paymentForm" name="paymentForm">
                                            <input type="hidden" name="forced_sandbox"/>
                                            <input type="hidden" id="variation_id" name="variation_id" value="51206"/>
                                            <div className="formline two-parts row">
                                                <div className="col-md-6 left-input-column">
                                                    <label> First Name: <strong>*</strong></label>
                                                    
                                                    <input type="text" id="fname" name="fname"className="required form-control" />
                                                </div>
                                                <div className="col-md-6 right-input-column">
                                                    <label>Last Name: <strong>*</strong></label>
                                                    
                                                    <input type="text" id="lname" name="lname" className="required form-control"/>
                                                </div>
                                            </div>
                                            <div className="formline two-parts row">
                                                <div className="col-md-6 left-input-column">
                                                    <label>E-mail Address: <strong>*</strong></label>
                                                    <i className="fa fa-envelope-o"></i>
                                                    <input type="email" id="email" name="email" className="required email form-control"/>
                                                </div>
                                            </div>
                                            <div className="coupon row" id="couponBox" style={{display: 'flex', alignItems: 'flex-end'}}>                                                
                                                <div className="col-md-8">
                                                    <label>DISCOUNT COUPON</label>
                                                    
                                                    <input type="text" id="coupon" name="coupon" className="form-control"/>
                                                </div>
                                                <div className="col-md-4">
                                                    <button type="button" className="submit-coupon btn btn-default">APPLY COUPON</button>
                                                </div>
                                                
                                            </div>
                                            <div className="section-title">
                                                <h1>Payment Information</h1>
                                                <p>Fields marked with 
                                                    <span>*</span> are mandatory
                                                </p>
                                            </div>
                                            <div className="non-physical-bump">
                                                <div className="order-bump">
                                                    <div className="order-bump-btn">                                                                                                              
                                                        <div className="order-bump-name">
                                                            <input type="checkbox"/>
                                                            <p>Yes, Add IIFYM Coaching - Discount Price</p>
                                                        </div>                                                        
                                                    </div>
                                                    <div className="order-bump-desc">
                                                        <p>For only $97 we will provide you with your very own IIFYM ACCOUNTABILITY COACH for 3 months. You'll get unlimited macro adjustments &amp; unlimited questions answered. (9am - 5pm M-F)</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-payment">
                                                <div className="payment-form">
                                                    <div className="payment-selection">
                                                        <label>
                                                            <input type="radio" name="cart_select"/>
                                                            <span className="icon"></span>
                                                            <span className="label">
                                                                <img className="selection-img" src="https://d2n844f18s487r.cloudfront.net/modules/templates/sunshine/img/icons/carts.png"/>
                                                            </span>
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="cart_select"/>
                                                            <span className="icon"></span>
                                                            <span className="label">
                                                                <img className="selection-img paypal" src="https://d2n844f18s487r.cloudfront.net/modules/templates/sunshine/img/icons/paypal.png"/>
                                                            </span>
                                                        </label>
                                                    </div>                                                    
                                                    <div className="cc-processor-form">
                                                        <div className="formline row">
                                                            <div className="col-md-8">
                                                                <label>Credit Card Number: *</label>
                                                                <input id="ccnum" name="ccnum" type="text" data-stripe="number" className="required form-control"/>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label>CVV: *</label>
                                                                <input type="text" id="CVV2" name="CVV2" data-stripe="cvc" className="required form-control"/>
                                                            </div>
                                                        </div>
                                                        <div className="formline row">
                                                            <div className="col-md-6">
                                                                <label>Expiration Month: *</label>
                                                                <i className="fa fa-caret-down select-arrow"></i>
                                                                <select id="expmonth" name="expmonth" className="required form-control">
                                                                    <option >Select Month</option>
                                                                    <option value="01">01 - January</option>
                                                                    <option value="02">02 - February</option>
                                                                    <option value="03">03 - March</option>
                                                                    <option value="04">04 - April</option>
                                                                    <option value="05">05 - May</option>
                                                                    <option value="06">06 - June</option>
                                                                    <option value="07">07 - July</option>
                                                                    <option value="08">08 - August</option>
                                                                    <option value="09">09 - September</option>
                                                                    <option value="10">10 - October</option>
                                                                    <option value="11">11 - November</option>
                                                                    <option value="12">12 - December</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label>Expiration Year: *</label>
                                                                <i className="fa fa-caret-down select-arrow"></i>
                                                                <select id="expyear" name="expyear" className="required form-control">
                                                                    <option >Select Year</option>
                                                                    <option value="2017">2017</option>
                                                                    <option value="2018">2018</option>
                                                                    <option value="2019">2019</option>
                                                                    <option value="2020">2020</option>
                                                                    <option value="2021">2021</option>
                                                                    <option value="2022">2022</option>
                                                                    <option value="2023">2023</option>
                                                                    <option value="2024">2024</option>
                                                                    <option value="2025">2025</option>
                                                                    <option value="2026">2026</option>
                                                                    <option value="2027">2027</option>
                                                                    <option value="2028">2028</option>
                                                                    <option value="2029">2029</option>
                                                                    <option value="2030">2030</option>
                                                                    <option value="2031">2031</option>
                                                                    <option value="2032">2032</option>
                                                                    <option value="2033">2033</option>
                                                                    <option value="2034">2034</option>
                                                                    <option value="2035">2035</option>
                                                                    <option value="2036">2036</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src="https://d2n844f18s487r.cloudfront.net/modules/templates/shared/img/trust-seals.png" className="trust-seals"/>
                                            <div className="pricing-summary">
                                                <div className="section-title">
                                                    <h1>Order Summary</h1>
                                                </div>
                                                
                                                <div className="price">                                                    
                                                    <div>Total</div>
                                                    <div className="price-placement">
                                                        $<div className="product-price">67.00</div>
                                                    </div>                                                    
                                                </div>
                                                
                                            </div>
                                            <button type="submit" className="btn btn-success">Click Here To Get Started</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="trust-panel">
                                        <p>
                                            <img alt="" height="140" src="http://s3-us-west-2.amazonaws.com/iifymweb/wp-content/uploads/2016/10/26190225/IIFYM-before-after-pic.jpg" width="150"/>
                                        </p>
                                        <p>
                                            <strong>I promise that this program will work for you.</strong>
                                            <br/>
                                                If after 30 days of following your Custom Macro Blueprint,&nbsp;you have not gotten closer to your goals, I will refund 100% of the cost. All I ask is that you provide your 30 day&nbsp;Myfitnesspal.com or Macrotracker.com log so we can verify that you follow the program as we created for you.
                                            <br/>
                                            <br/>
                                            <br/>
                                        </p>
                                        <div className="list-wrapper">
                                            <h2 className="list-title">I PROMISE THIS PROGRAM WILL WORK FOR YOU OR YOUR MONEY BACK</h2>
                                            <ul className="sidebar-list">
                                                <li>
                                                    <i className="fa fa-check pull-left"></i>
                                                    <div className="bullet-text">Don't you owe it to yourself to try something that works for everyone?</div>
                                                </li>
                                                <li>
                                                    <i className="fa fa-check pull-left"></i>
                                                    <div className="bullet-text">There is absolutely ZERO RISK for you</div>
                                                </li>
                                                <li>
                                                    <i className="fa fa-check pull-left"></i>
                                                    <div className="bullet-text">Your fat loss is guaranteed</div>
                                                </li>
                                                <li>
                                                    <i className="fa fa-check pull-left"></i>
                                                    <div className="bullet-text">This program works 100% of the time for 100% of the people that follow our instructions!</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="testimonial-group">
                                            <h2>Successful clients!</h2>
                                            <div className="testimonial-item">
                                                <div className="testimonial-image">
                                                    <img src="https://s3.amazonaws.com/samcart-foundation-prod/marketplace-5232/Kq63SQZXCFiaJGV48wQF6V6jUFu1b5.jpg"/>
                                                </div>
                                                <p className="testimonial-text">I just want to tell you how overly impressed I am with the customized program you built for me. It has only been 3 weeks and I am already down 11 lbs! IIFYM is amazing!! I am hooked!</p>
                                            </div>
                                            <div className="testimonial-item">
                                                <div className="testimonial-image">
                                                    <img src="https://s3.amazonaws.com/samcart-foundation-prod/marketplace-5232/DPZcFNRvvbNO6lj8GCnC7SgqFl11Q6.jpg"/>
                                                </div>
                                                <p className="testimonial-text">Thank you so much! Your formula is working like magic! I can't believe I have lost 2 pounds and my percentage body fat has gone down this week! I feel great and love IIFYM!!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three-sections">
                                        <table style={{width: '100%'}}>
                                            <tbody>
                                                <tr>
                                                    <td style={{textAlign: 'center'}}>
                                                        <div className="relative-wrapper">
                                                            <span></span>
                                                            <p>30 Day
                                                                <br/>Money Back
                                                                <br/>Guarantee
                                                            </p>
                                                            <div className="tooltip">
                                                                <div className="tooltip-inner">
                                                                    <em>If you're not completely satisfied, get your money back within 30 days.</em>
                                                                    <i className="fa fa-caret-down"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{textAlign: 'center'}}>
                                                        <div className="relative-wrapper">
                                                            <span></span>
                                                            <p>IIFYM.com
                                                                <br/>Protects Your
                                                                <br/>Privacy
                                                            </p>
                                                            <div className="tooltip">
                                                                <div className="tooltip-inner">
                                                                    <em>We will not share or trade online information that you provide us.</em>
                                                                    <i className="fa fa-caret-down"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{textAlign: 'center'}}>
                                                        <div className="relative-wrapper">
                                                            <span></span>
                                                            <p>Your
                                                                <br/>Information
                                                                <br/>is Secure
                                                            </p>
                                                            <div className="tooltip">
                                                                <div className="tooltip-inner">
                                                                    <em>All personal information is encrypted and secure.</em>
                                                                    <i className="fa fa-caret-down"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="footer-decoration">
                        <div className="middle-container">
                            <img className="logo" src="https://s3.amazonaws.com/samcart-foundation-prod/marketplace-5232/mAVgI7IjeLyzD2Tl31tNA7m61RUdEL.png"/>
                            <div>
                                <p>Copyright © 2017 IIFYM.com - All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>           
        )    
    }
}

export default ProductBuy