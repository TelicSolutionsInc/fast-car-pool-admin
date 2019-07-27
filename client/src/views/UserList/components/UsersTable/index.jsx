import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

// Shared helpers
import { getInitials } from 'helpers';

// Shared components
import { Portlet, PortletContent } from 'components';

// Component styles
import styles from './styles';

class UsersTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 10,
    page: 0
  };

  handleSelectAll = event => {
    const { users, onSelect } = this.props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.uid);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });

    onSelect(selectedUsers);
  };

  handleSelectOne = (event, uid) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(uid);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, uid);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, users } = this.props;
    const { 
      // activeTab, 
      selectedUsers, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={this.handleSelectAll}
                    />
                    Name
                  </TableCell>
                  {/* <TableCell align="left">ID</TableCell> */}
                  <TableCell align="left">State</TableCell>
                  <TableCell align="left">User Status</TableCell>
                  <TableCell align="left">Email Verification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  // .filter(user => {
                  //   if (activeTab === 1) {
                  //     return !user.returning;
                  //   }

                  //   if (activeTab === 2) {
                  //     return user.returning;
                  //   }

                  //   return user;
                  // })
                  // .slice(0, rowsPerPage)
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.uid}
                      selected={selectedUsers.indexOf(user.uid) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={selectedUsers.indexOf(user.uid) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, user.uid)
                            }
                            value="true"
                          />
                          <Avatar
                            className={classes.avatar}
                            src={user.photoUrl}
                          >
                            {getInitials(user.displayName)}
                          </Avatar>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.displayName}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      {/* <TableCell className={classes.tableCell}>
                        {user.uid}
                      </TableCell> */}
                      <TableCell className={classes.tableCell}>
                        {user.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.disabled ? "Disabled" : "Enabled"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {/* {moment(user.createdAt).format('DD/MM/YYYY')} */}
                            {user.emailVerified ? "Verified" : "Verification Pending"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={users.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(UsersTable);
