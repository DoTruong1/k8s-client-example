const k8s = require('@kubernetes/client-node');

async function getSpecificPvc(pvcName, namespace) {
  // Load the kubeconfig from the default location (~/.kube/config)
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  // Create an API client for the CoreV1 API
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  try {
    // Get the specific PVC by name in the specified namespace
    const pvc = await k8sApi.readNamespacedPersistentVolumeClaim(pvcName, namespace);

    // Print details of the PVC
    console.log(`PVC Name: ${pvc.body.metadata.name}`);
    console.log(`Namespace: ${pvc.body.metadata.namespace}`);
    console.log(`Status: ${pvc.body.status.phase}`);
    
    // Check if the PVC is bound to a PV
    if (pvc.body.status.phase === 'Bound' && pvc.body.spec.volumeName) {
      console.log(`PV Name: ${pvc.body.spec.volumeName}`);
    } else {
      console.log('PVC is not bound to a PV');
    }
  } catch (err) {
    console.error(`Error fetching PVC '${pvcName}' in namespace '${namespace}':`, err.body.message);
  }
}

// Replace 'my-pvc' and 'default' with the name of your PVC and its namespace
const pvcName = 'my-pvc';
const namespace = 'default';

getSpecificPvc(pvcName, namespace);
