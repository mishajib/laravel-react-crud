import React, {Component} from 'react';
import ReactDOM from "react-dom";
import axios from "axios";

class CustomerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: true,
            customers: [],
            pagination: {
                current_page: 1
            },
        };
    }

    componentDidMount() {
        this.getData();
    }

    createHandler(event) {
        event.preventDefault();
        this.setState({
            editMode: false
        });
        $('#customerModalLong').modal('show');
    }

    getData() {
        axios.get('/api/customers?page=' + this.state.pagination.current_page)
            .then(response => {
                this.setState({
                    customers: response.data.data,
                    pagination: response.data.meta,
                });
            })
            .catch(e => {
                console.log(e)
            });
    }


    reloadHandler() {
        this.getData();
    }

    render() {
        let {customers} = this.state;

        return (
            <div className="customer">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Customers</h3>
                        <div className="card-tools" style={{position: "absolute", right: "1rem", top: ".5rem"}}>
                            <button type="button" className="btn btn-info" onClick={this.createHandler.bind(this)}>
                                Add New <i className="fas fa-plus"/>
                            </button>
                            <button type="button" className="btn btn-primary" onClick={this.reloadHandler.bind(this)}>
                                Reload <i className="fas fa-sync"/>
                            </button>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <strong>Search By: </strong>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-control" id="fields">
                                        <option value="name">Name</option>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                        <option value="address">Address</option>
                                        <option value="total">Total</option>
                                    </select>
                                </div>
                                <div className="col-md-7">
                                    <input type="text" className="form-control" placeholder="Search"/>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Total</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers.map((customer, index) => {
                                    return (
                                        <tr key={index}>
                                            <td scope="row">{++index}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.total}</td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-info btn-sm">
                                                    <i className="fas fa-eye"/>
                                                </button>

                                                <button type="button" className="btn btn-primary btn-sm">
                                                    <i className="fas fa-edit"/>
                                                </button>

                                                <button type="button" className="btn btn-danger btn-sm">
                                                    <i className="fas fa-trash-alt"/>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {!customers.length &&
                                <tr>
                                    <td colSpan="6">
                                        <div className="alert alert-danger" role="alert">
                                            Sorry :( No data found.
                                        </div>
                                    </td>
                                </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Add / Edit Modal */}
                <div className="modal fade" id="customerModalLong" tabIndex="-1" role="dialog"
                     aria-labelledby="customerModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="customerModalLongTitle">Add New Customer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" name="name"
                                               className="form-control"/>
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email"
                                               className="form-control"/>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" name="phone"
                                               className="form-control"/>
                                    </div>

                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea name="address"
                                                  className="form-control"/>
                                    </div>

                                    <div className="form-group">
                                        <label>Total</label>
                                        <input type="number" name="total"
                                               className="form-control"/>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Show Modal */}
                <div className="modal fade" id="showModal" tabIndex="-1" role="dialog"
                     aria-labelledby="showModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="showModalLabel">Create</h5>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <strong>Email : </strong>
                                <br/>
                                <strong>Phone : </strong>
                                <br/>
                                <strong>Total : </strong>
                                <br/>
                                <strong>Address :</strong>
                                <address/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CustomerComponent;

if (document.getElementById('app')) {
    ReactDOM.render(<CustomerComponent/>, document.getElementById('app'));
}

