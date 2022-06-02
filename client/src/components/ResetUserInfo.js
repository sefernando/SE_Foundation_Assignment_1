// import { Button, Form, Row, Col } from "react-bootstrap";
// import axios from "../api/axios";
// import { useContext, useState, useEffect } from "react";
// import AuthContext from "../context/AuthProvider";
// import Select from "react-select";

// const CHANG_ACC_STATUS_URL = "user/changeAccStatus";
// const CHANGE_EMAIL_URL = "user/changeEmail";
// const CHANGE_PWD_URL = "user/changePassword";
// const ADD_TO_GROUP_URL = "user/addToGroup";

// const ResetUserInfo = ({
//   user,
//   options,
//   groups,
//   allGroups,
//   setGroups,
//   pwd,
//   setPwd,
//   validPwd,
//   email,
//   setEmail,
//   validEmail,
// }) => {
//   const { auth } = useContext(AuthContext);

//   const buttonText = user.isActive ? "Disable Account" : "Enable Account";
//   const buttonVariant = user.isActive ? "danger" : "success";

//   //function to check if user is registered in a group
//   function checkGroup(userName, groupName) {
//     if (userName === user.userName) {
//       return user.groups.includes(groupName);
//     } else {
//       return false;
//     }
//   }

//   //preparing options for new group info
//   const filteredOptions = options.filter(
//     (option) => !checkGroup(user.userName, option.value)
//   );

//   //function for admin to enable/disable account
//   async function handleAccStatusSubmit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         CHANG_ACC_STATUS_URL,
//         JSON.stringify({
//           userName: user.userName,
//           adminUserName: auth.userName,
//           isActive: !user.isActive,
//         }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-access-token": auth.token,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response) {
//         alert("Successful");
//       }

//       // user.isActive
//       //   ? alert("Successfullt Disabled")
//       //   : alert("Succefully Enabled");
//     } catch (error) {}
//   }

//   //function for admin to change the email
//   async function handleEmailSubmit(e) {
//     console.log('');
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         CHANGE_EMAIL_URL,
//         JSON.stringify({
//           userName: user.userName,
//           adminUserName: auth.userName,
//           email: email,
//         }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-access-token": auth.token,
//           },
//           withCredentials: true,
//         }
//       );

//       console.log(response);
//       if (response) {
//         console.log(response);
//         alert("Email successfully changed!");
//       }
//     } catch (error) {
//       console.log("error");
//       alert("Error");
//     }
//   }

//   //function for admin to change the password
//   async function handlePasswordSubmit(e) {
//     e.preventDefault();

//     const response = await axios.put(
//       CHANGE_PWD_URL,
//       JSON.stringify({
//         userName: user.userName,
//         adminUserName: auth.userName,
//         password: pwd,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": auth.token,
//         },
//         withCredentials: true,
//       }
//     );
//   }

//   //handleChange function
//   const handleOptionsChange = (selectedOptions) => {
//     // let value = Array.from(e.target.selectedOptions, (option) => option.value);
//     setGroups(selectedOptions);
//   };

//   //handle groups submit button
//   const handleGroupsSubmit = async (e) => {
//     e.preventDefault();

//     await axios.put(
//       ADD_TO_GROUP_URL,
//       JSON.stringify({
//         userName: user.userName,
//         adminUserName: auth.userName,
//         groups: groups.map((x) => x.value),
//       }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": auth.token,
//         },

//         withCredentials: true,
//       }
//     );
//   };

//   return (
//     <>
//       <h2>Reset User Information</h2>

//       <Form onSubmit={handleAccStatusSubmit}>
//         <Form.Group
//           as={Row}
//           className="mb-3"
//           controlId="formHorizontalUsername"
//         >
//           <Form.Label column sm={2}>
//             Username
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Control
//               type="text"
//               placeholder={user.userName}
//               aria-label="Disabled input example"
//               disabled
//               readOnly
//             />
//           </Col>
//           <Col sm={{ span: 10, offset: 2 }}>
//             <Button variant={buttonVariant} type="submit">
//               {buttonText}
//             </Button>
//           </Col>
//         </Form.Group>
//       </Form>

//       <Form onSubmit={handleEmailSubmit}>
//         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//           <Form.Label column sm={2}>
//             Email
//           </Form.Label>
//           <Col sm={10}>
//             {email && !validEmail && (
//               <small style={{ color: "red" }}>Enter a valid email</small>
//             )}
//             <Form.Control
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Col>
//           <Col sm={{ span: 10, offset: 2 }}>
//             <Button
//               type="submit"
//               disabled={!validEmail}
//               variant={validEmail ? "primary" : "secondary"}
//             >
//               Change Email
//             </Button>
//           </Col>
//         </Form.Group>
//       </Form>

//       <Form onSubmit={handlePasswordSubmit}>
//         <Form.Group
//           as={Row}
//           className="mb-3"
//           controlId="formHorizontalPassword"
//         >
//           <Form.Label column sm={2}>
//             Password
//           </Form.Label>
//           <Col sm={10}>
//             {pwd && !validPwd && (
//               <small style={{ color: "red" }}>
//                 8 to 10 characters including alphabets , numbers, and special
//                 characters
//               </small>
//             )}
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               value={pwd}
//               onChange={(e) => setPwd(e.target.value)}
//             />
//           </Col>
//           <Col sm={{ span: 10, offset: 2 }}>
//             <Button
//               type="submit"
//               disabled={!validPwd}
//               variant={validPwd ? "primary" : "secondary"}
//             >
//               Change Password
//             </Button>
//           </Col>
//         </Form.Group>
//       </Form>

//       {/*  */}
//       <Form onSubmit={handleGroupsSubmit}>
//         <Form.Group as={Row} className="mb-3" controlId="formHorizontalGroups">
//           <Form.Label column sm={2}>
//             Add Groups
//           </Form.Label>
//           <Col sm={10}>
//             <Select
//               name="groups"
//               isMulti={true}
//               value={groups}
//               options={filteredOptions}
//               onChange={handleOptionsChange}
//             />
//           </Col>
//           <Col sm={{ span: 10, offset: 2 }}>
//             <Button
//               type="submit"
//               disabled={!groups.length}
//               variant={groups.length ? "primary" : "secondary"}
//             >
//               Add Groups
//             </Button>
//           </Col>
//         </Form.Group>
//       </Form>
//       {/*  */}
//     </>
//   );
// };

// export default ResetUserInfo;
