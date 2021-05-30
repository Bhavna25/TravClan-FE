import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@material-ui/core';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Loading from './Loading';
import ReactPaginate from 'react-paginate';

function Customer(props) {

    let  customerData  = props.customerData;
    const [pageNumber, setPageNumber] = useState(0);
    const [state, setState] = useState({
        checkedB: false,
        increasing: false,
        decreasing: true
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleSort = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    const getMinBid = (bids) => {
        return bids.reduce((acc, cur) => {
            return acc.amount > cur.amount ? cur : acc;
        },{ amount: 100000000000 });
    }

    const getMaxBid = (bids) => {
        return bids.reduce((acc, cur) => {
            return acc.amount < cur.amount ? cur : acc;
        },{ amount: 0 });
    }

    const sortCustomerByBidAmountDecreasing = (customerData) => {
        return customerData.sort(function(a,b){
            let bid1 = getMaxBid(a.bids);
            let bid2 = getMaxBid(b.bids);
            return  bid1.amount - bid2.amount;
        })
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
    }))(TableRow);

    const useStyles = makeStyles({
        table: {
          width: "50%",
          margin: 'auto'
        },
        img: {
           display: "inline-block"
        },
        toggleBtn: {
            padding: 20,
            alignItems: 'center',
            width: '36%',
            margin: 'auto',
            float: 'right'
        },
        toggleBtn1: {
            padding: 20,
            alignItems: 'center',
            width: '35%',
            margin: 'auto',
            float: 'right'
        },
        link: {
            textDecoration: 'none'
        },
        name: {
            position: 'relative',
            top: -15,
            paddingLeft: 10
        }
    });

    const classes = useStyles();

    if(customerData.length === 0) {
        return <Loading/>
    }

    if(state.increasing) {
        sortCustomerByBidAmountDecreasing(customerData);
    }else{
        customerData =  sortCustomerByBidAmountDecreasing(customerData).reverse();
    }

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = customerData.slice(pagesVisited, pagesVisited + usersPerPage).map(customer => {
        return (
            <StyledTableRow key={customer.id} >
                <Link className={classes.link} to={"/customer-detail/" + customer.id}>
                    <StyledTableCell component="th" scope="row" >
                        <Avatar className={classes.img} alt={customer.firsname} src={customer.avatarUrl} />
                        <span className={classes.name}>
                            {customer.firstname}
                            &nbsp;
                            {customer.lastname}
                        </span>
                    </StyledTableCell>
                </Link>
                <StyledTableCell align="right">{customer.email}</StyledTableCell>
                <StyledTableCell align="right">{customer.phone}</StyledTableCell>
                <StyledTableCell align="right">{customer.hasPremium ? "True" : "False"}</StyledTableCell>
                <StyledTableCell align="right">{state.checkedB ? getMinBid(customer.bids).amount : getMaxBid(customer.bids).amount}</StyledTableCell>
            </StyledTableRow>
        )
    });
    
    const pageCount = Math.ceil(customerData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
      <div>
        <FormGroup row className={classes.toggleBtn}>
            Show Min/Max bid &nbsp;
            <FormControlLabel
                control={
                <Switch
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
                }
            />
        </FormGroup>
        <FormGroup row className={classes.toggleBtn1}>
            Sort by Bid &nbsp;
            <FormControlLabel
                control={
                <Switch
                    checked={state.increasing}
                    onChange={handleSort}
                    name="increasing"
                    color="primary"
                />
                }
            />
        </FormGroup>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Customer Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                        <StyledTableCell align="right">Premium</StyledTableCell>
                        <StyledTableCell align="right">{ state.checkedB ? "Min" : "Max"} Bid</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayUsers}
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </TableBody>
            </Table>
        </TableContainer>
      </div>
    );
}
  
export default Customer;