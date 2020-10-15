<template>
  <div class="home">
    <div class="container py-4">
      <div class="row">
        <div class="col-12 text-center mb-4">
          <h3>Welcome to student application</h3>
        </div>
        <!-- Router Links -->
        <div class="col-12 mb-3">
          <div class="d-flex flex-row-reverse">
            <div class="p-1">
              <router-link
                to="/student-create"
                type="button"
                class="btn shadow-sm"
                >Create Student</router-link
              >
            </div>
            <div class="p-1">
              <router-link to="/subjects" type="button" class="btn shadow-sm"
                >Subjects</router-link
              >
            </div>
          </div>
        </div>
        <!-- End Router Links -->

        <!-- Students Table -->
        <div class="col-12 mb-4">
          <table class="table table-sm table-bordered table-responsive-sm">
            <thead>
              <tr>
                <td class="text-center"><p>SL</p></td>
                <td><p>Name</p></td>
                <td><p>E-mail</p></td>
                <td><p>Phone</p></td>
                <td><p>Date of birth.</p></td>
                <td><p>Subjects</p></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, i) in students" :key="i">
                <td class="text-center">
                  <p>{{ i + 1 }}</p>
                </td>
                <td class="text-capitalize">
                  <p>{{ student.name }}</p>
                </td>
                <td class="text-lowercase">
                  <p>{{ student.email }}</p>
                </td>
                <td>
                  <p>{{ student.phone }}</p>
                </td>
                <td>
                  <p>{{ student.dob }}</p>
                </td>
                <td class="text-capitalize">
                  <p v-for="(subject, j) in student.subjects" :key="j">
                    {{ subject.sub.name }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- End Students Table -->
      </div>
    </div>
  </div>
</template>

<script>
import { Students } from "../../../imports/api/students";
import { Subjects } from "../../../imports/api/subject";
export default {
  data() {
    return {};
  },
  meteor: {
    students() {
      const students = Students.find({}).fetch();
      const response = {
        result: students.map((student) => {
          return {
            name: student.name,
            phone: student.phone,
            email: student.email,
            dob: student.dob,
            subjects: student.subjects.map((subject) => {
              return {
                sub: Subjects.findOne({ _id: subject }),
              };
            }),
          };
        }),
      };
      return response.result;
    },
  },
};
</script>

<style lang="css" scoped>
.home h3 {
  color: #000;
  font-weight: 600;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}
.home .btn {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  background: #e42672;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}

.home .table thead p {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}
.home .table tbody p {
  color: #000;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 0;
  font-family: "Roboto", sans-serif;
}
</style>