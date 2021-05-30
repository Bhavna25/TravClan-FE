import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardMedia, Avatar } from "@material-ui/core";
import KeyboardBackspaceSharp from "@material-ui/icons/KeyboardBackspaceSharp";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Loading from "./Loading";

function CustomerDetail(props) {
  const [customerDetail, setCustomerDetail] = useState([]);

  useEffect(() => {
    const url =
      "https://intense-tor-76305.herokuapp.com/merchants?id=" +
      props.match.params.customer_id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerDetail(data[0]);
      });
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: "auto"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    avatar: {
      backgroundColor: "#3f51b5"
    },
    backBtn: {
      textAlign: "center",
      background: "#3f51b5",
      width: "6%",
      margin: "auto",
      marginTop: 30,
      marginBottom: 30,
      borderRadius: 12,
      paddingBottom: 10
    },
    link: {
      textDecoration: "none",
      color: "white"
    },
    icon: {
      position: "relative",
      top: "5px"
    },
    bids: {
      margin: 50
    },
    table: {
      minWidth: 700,
      width: "50%",
      margin: "auto"
    },
    error: {
      background: "#3f51b5",
      color: "white",
      padding: 10,
      width: "50%",
      margin: "auto",
      textAlign: "center",
      marginTop: 30
    }
  }));

  const classes = useStyles();

  if (customerDetail.length === 0) {
    return <Loading />;
  }
  return (
    <div>
      <Link to="/" className={classes.link}>
        <div className={classes.backBtn}>
          <KeyboardBackspaceSharp className={classes.icon} /> Back
        </div>
      </Link>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {customerDetail.firstname.substring(0, 1)}
            </Avatar>
          }
          title={customerDetail.firstname + " " + customerDetail.lastname}
          subheader={customerDetail.email}
        />
        <CardMedia
          className={classes.media}
          image={customerDetail.avatarUrl}
          title={customerDetail.firstname}
        />
      </Card>
      {customerDetail.bids.length ? (
        <div className={classes.bids}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell align="right">Car Title</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerDetail.bids.map((bid, index) => (
                  <StyledTableRow key={bid.id}>
                    <StyledTableCell>{index}</StyledTableCell>
                    <StyledTableCell align="right">
                      {bid.carTitle}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {bid.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className={classes.error}>Oh! You Don't have Any Bids</div>
      )}
    </div>
  );
}

export default CustomerDetail;
