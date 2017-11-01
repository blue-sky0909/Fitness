import './PurchaseMembership.scss'

class PurchaseMembership extends React.Component {
  render() {
    return(
      <div className="wrapper-decoration">
        <header className="header"></header>
        <div className="checkout-container">
          <div className="middle-container">
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

export default PurchaseMembership