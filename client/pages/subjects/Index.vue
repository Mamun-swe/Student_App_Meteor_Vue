<template>
  <div class="subject-index">
    <div class="container py-4">
      <div class="row">
        <div class="col-12 text-center mb-4">
          <h3>Subject List</h3>
        </div>
        <!-- Router Links -->
        <div class="col-12 mb-3">
          <div class="d-flex flex-row-reverse">
            <div class="p-1">
              <router-link
                to="/subject-create"
                type="button"
                class="btn shadow-sm"
                >Create Subject</router-link
              >
            </div>
            <div class="p-1">
              <router-link to="/" type="button" class="btn shadow-sm"
                >Students</router-link
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
                <td><p>Students</p></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, i) in subjects" :key="i">
                <td class="text-center">
                  <p>{{ i + 1 }}</p>
                </td>
                <td class="text-capitalize">
                  <p>{{ subject.name }}</p>
                </td>
                <td class="text-capitalize">
                  <p v-for="(student, j) in subject.students" :key="j">
                    {{ student.name }}
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
import { Subjects } from "../../../imports/api/subject";
import { Students } from "../../../imports/api/students";
export default {
  data() {
    return {};
  },
  meteor: {
    subjects() {
      const subjects = Subjects.find({}).fetch();
      const response = {
        result: subjects.map((subject) => {
          return {
            name: subject.name,
            students: Students.find({
              subjects: { $in: [subject._id] },
            }).fetch(),
          };
        }),
      };
      return response.result;
    },
  },
};
</script>

<style lang="css" scoped>
.subject-index h3 {
  color: #000;
  font-weight: 600;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}
.subject-index .btn {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  background: #e42672;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}
.subject-index .table thead p {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}
.subject-index .table tbody p {
  color: #000;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 0;
  font-family: "Roboto", sans-serif;
}
</style>