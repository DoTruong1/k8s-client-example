const crypto = require("crypto");
const k8s = require("@kubernetes/client-node");
const md5 = require("apache-md5");

async function createBasicAuthSecret(projectName, data) {
  // Create a Kubernetes API client
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const coreApi = kc.makeApiClient(k8s.CoreV1Api);

  // Define the Secret object
  const secret = {
    apiVersion: "v1",
    kind: "Secret",
    metadata: {
      name: projectName, # đặt theo tên project
  
    },
    type: "Opaque",
    data: {
      auth: Buffer.from(data).toString("base64"), // Base64-encoded htpasswd hash
    },
  };

  try {
    // Create the Secret
    const response = await coreApi.createNamespacedSecret("default", secret); //giá trị default đặt sửa thành namespace muốn tạo
    console.log("Secret created:", response.body);
  } catch (error) {
    console.error("Error creating Secret:", error);
  }
}

function generateHTPasswdHash(projectName, randomToken) {
  const hash = md5(randomToken);
  console.log(`${projectName}:${hash}`);

  // remove weird '%' at the end
  return `${projectName}:${hash}`;
}

// Example usage
const projectName = "example-name"; # tên project
const randomToken = "123456789"; # sinh token random
const hash = generateHTPasswdHash(projectName, randomToken);
console.log(`password: ${randomToken}`);
console.log(hash);
createBasicAuthSecret("test", hash);
