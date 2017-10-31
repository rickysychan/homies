import React, { Component } from 'react';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {},
      user_id: 82,
      interest: []
    }
  }

  render() {

    const sidebarStyle = {
      marginLeft: '15px',
      paddingTop: '1px'
    }

    const headerStyle = {
      fontSize: '100%',
    }

    return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div className="affix-top" data-spy="affix" data-offset-top="45" data-offset-bottom="90">
            <div id="accordion" role="tablist" aria-multiselectable="true">
              <ul className="nav" id="sidebar-nav">

                <li>
                  <div className="card" style={sidebarStyle}>
                    <div className="card-header" role="tab" id="recommendations">
                      <h4 className="mb-0" style={headerStyle}>
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          Your Recommendations:
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="recommendations">
                      <div className="card-block">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="card" style={sidebarStyle}>
                    <div className="card-header" role="tab" id="interests">
                      <h4 className="mb-0" style={headerStyle}>
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Your Product Interests:
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="interests">
                      <div className="card-block">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default SideBar;